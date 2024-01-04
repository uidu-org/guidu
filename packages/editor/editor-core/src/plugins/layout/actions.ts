import { safeInsert } from '@uidu/prosemirror-utils';
import { Fragment, Node, Schema, Slice } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';
import { Command } from '../../types/command';
import { getStepRange, isEmptyDocument } from '../../utils';
import { flatmap, mapChildren } from '../../utils/slice';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
} from '../analytics/types/enums';
import { LAYOUT_TYPE } from '../analytics/types/node-events';
import { addAnalytics, withAnalytics } from '../analytics/utils';
import { TOOLBAR_MENU_TYPE } from '../insert-block/ui/ToolbarInsertBlock/types';
import { pluginKey } from './pm-plugins/plugin-key';
import { LayoutState } from './pm-plugins/types';
import { Change, PresetLayout } from './types';

export const TWO_COL_LAYOUTS: PresetLayout[] = [
  'two_equal',
  'two_left_sidebar',
  'two_right_sidebar',
];
export const THREE_COL_LAYOUTS: PresetLayout[] = [
  'three_equal',
  'three_with_sidebars',
];

const getWidthsForPreset = (presetLayout: PresetLayout): number[] => {
  switch (presetLayout) {
    case 'two_equal':
      return [50, 50];
    case 'three_equal':
      return [33.33, 33.33, 33.33];
    case 'two_left_sidebar':
      return [33.33, 66.66];
    case 'two_right_sidebar':
      return [66.66, 33.33];
    case 'three_with_sidebars':
      return [25, 50, 25];
  }
};

/**
 * Finds layout preset based on the width attrs of all the layoutColumn nodes
 * inside the layoutSection node
 */
export const getPresetLayout = (section: Node): PresetLayout | undefined => {
  const widths = mapChildren(section, (column) => column.attrs.width).join(',');

  switch (widths) {
    case '33.33,33.33,33.33':
      return 'three_equal';
    case '25,50,25':
      return 'three_with_sidebars';
    case '50,50':
      return 'two_equal';
    case '33.33,66.66':
      return 'two_left_sidebar';
    case '66.66,33.33':
      return 'two_right_sidebar';
  }
  return undefined;
};

export const getSelectedLayout = (
  maybeLayoutSection: Node | undefined,
  current: PresetLayout,
): PresetLayout => {
  if (maybeLayoutSection && getPresetLayout(maybeLayoutSection)) {
    return getPresetLayout(maybeLayoutSection) || current;
  }
  return current;
};

export const createDefaultLayoutSection = (state: EditorState) => {
  const { layoutSection, layoutColumn } = state.schema.nodes;

  console.log(state.schema);
  console.log(state.schema.nodes);

  console.log('layoutSection', layoutSection);
  console.log('layoutColumn', layoutColumn);

  // create a 50-50 layout by default
  const columns = Fragment.fromArray([
    layoutColumn.createAndFill({ width: 50 }),
    layoutColumn.createAndFill({ width: 50 }),
  ]);

  console.log('columns', columns);

  return layoutSection.createAndFill(undefined, columns);
};

export const insertLayoutColumns: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(safeInsert(createDefaultLayoutSection(state))(state.tr));
  }
  return true;
};

export const insertLayoutColumnsWithAnalytics = (
  inputMethod: TOOLBAR_MENU_TYPE,
): Command =>
  withAnalytics({
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId: ACTION_SUBJECT_ID.LAYOUT,
    attributes: {
      inputMethod,
    },
    eventType: EVENT_TYPE.TRACK,
  })(insertLayoutColumns);

/**
 * Handles switching from 2 -> 3 cols, or 3 -> 2 cols
 * Switching from 2 -> 3 just adds a new one at the end
 * Switching from 3 -> 2 moves all the content of the third col inside the second before
 * removing it
 */
function forceColumnStructure(
  state: EditorState,
  node: Node,
  pos: number,
  presetLayout: PresetLayout,
): Transaction {
  const tr = state.tr;
  const insideRightEdgeOfLayoutSection = pos + node.nodeSize - 1;
  const numCols = node.childCount;

  if (TWO_COL_LAYOUTS.indexOf(presetLayout) >= 0 && numCols === 3) {
    const thirdColumn = node.content.child(2);
    const thirdColumnPos =
      insideRightEdgeOfLayoutSection - thirdColumn.nodeSize;
    if (isEmptyDocument(thirdColumn)) {
      tr.replaceRange(
        // end pos of second column
        tr.mapping.map(thirdColumnPos - 1),
        tr.mapping.map(insideRightEdgeOfLayoutSection),
        Slice.empty,
      );
    } else {
      tr.replaceRange(
        // end pos of second column
        tr.mapping.map(thirdColumnPos - 1),
        // start pos of third column
        tr.mapping.map(thirdColumnPos + 1),
        Slice.empty,
      );
    }
  } else if (THREE_COL_LAYOUTS.indexOf(presetLayout) >= 0 && numCols === 2) {
    tr.replaceWith(
      tr.mapping.map(insideRightEdgeOfLayoutSection),
      tr.mapping.map(insideRightEdgeOfLayoutSection),
      state.schema.nodes.layoutColumn.createAndFill(),
    );
  }

  return tr;
}

function columnWidth(node: Node, schema: Schema, widths: number[]): Fragment {
  const { layoutColumn } = schema.nodes;
  const truncatedWidths: number[] = widths.map((w) => Number(w.toFixed(2)));

  return flatmap(node.content, (column, idx) =>
    layoutColumn.create(
      {
        ...column.attrs,
        width: truncatedWidths[idx],
      },
      column.content,
      column.marks,
    ),
  );
}

function forceColumnWidths(
  state: EditorState,
  tr: Transaction,
  pos: number,
  presetLayout: PresetLayout,
) {
  const node = tr.doc.nodeAt(pos);
  if (!node) {
    return tr;
  }

  return tr.replaceWith(
    pos + 1,
    pos + node.nodeSize - 1,
    columnWidth(node, state.schema, getWidthsForPreset(presetLayout)),
  );
}

export function forceSectionToPresetLayout(
  state: EditorState,
  node: Node,
  pos: number,
  presetLayout: PresetLayout,
): Transaction {
  let tr = forceColumnStructure(state, node, pos, presetLayout);

  // save the selection here, since forcing column widths causes a change over the
  // entire layoutSection, which remaps selection to the end. not remapping here
  // is safe because the structure is no longer changing.
  const selection = tr.selection;

  tr = forceColumnWidths(state, tr, pos, presetLayout);

  return tr.setSelection(
    new TextSelection(tr.doc.resolve(selection.$from.pos)),
  );
}

export const setPresetLayout =
  (layout: PresetLayout): Command =>
  (state, dispatch) => {
    const { pos, selectedLayout } = pluginKey.getState(state) as LayoutState;
    if (selectedLayout === layout || pos === null) {
      return false;
    }

    const node = state.doc.nodeAt(pos);
    if (!node) {
      return false;
    }

    let tr = forceSectionToPresetLayout(state, node, pos, layout);
    if (tr) {
      tr = addAnalytics(state, tr, {
        action: ACTION.CHANGED_LAYOUT,
        actionSubject: ACTION_SUBJECT.LAYOUT,
        attributes: {
          previousLayout: formatLayoutName(<PresetLayout>selectedLayout),
          newLayout: formatLayoutName(layout),
        },
        eventType: EVENT_TYPE.TRACK,
      });
      tr.setMeta('scrollIntoView', false);
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }

    return false;
  };

function layoutNeedChanges(node: Node): boolean {
  return !getPresetLayout(node);
}

function getLayoutChange(
  node: Node,
  pos: number,
  schema: Schema,
): Change | undefined {
  if (node.type === schema.nodes.layoutSection) {
    if (!layoutNeedChanges(node)) {
      return undefined;
    }

    const presetLayout = node.childCount === 2 ? 'two_equal' : 'three_equal';

    const fixedColumns = columnWidth(
      node,
      schema,
      getWidthsForPreset(presetLayout),
    );

    return {
      from: pos + 1,
      to: pos + node.nodeSize - 1,
      slice: new Slice(fixedColumns, 0, 0),
    };
  }
  return undefined;
}

export const fixColumnSizes = (changedTr: Transaction, state: EditorState) => {
  const { layoutSection } = state.schema.nodes;
  let change;
  const range = getStepRange(changedTr);
  if (!range) {
    return undefined;
  }

  changedTr.doc.nodesBetween(range.from, range.to, (node, pos) => {
    if (node.type !== layoutSection) {
      return true; // Check all internal nodes expect for layout section
    }
    // Node is a section
    if (layoutNeedChanges(node)) {
      change = getLayoutChange(node, pos, state.schema);
    }
    return false; // We dont go deep, We dont accept nested layouts
  });

  // Hack to prevent: https://product-fabric.atlassian.net/browse/ED-7523
  // By default prosemirror try to recreate the node with the default attributes
  // The default attribute is invalid adf though. when this happen the node after
  // current position is a layout section
  const $pos = changedTr.doc.resolve(range.to);
  if ($pos.depth > 0) {
    // 'range.to' position could resolve to doc, in this ResolvedPos.after will throws
    const pos = $pos.after();
    const node = changedTr.doc.nodeAt(pos);
    if (node && node.type === layoutSection && layoutNeedChanges(node)) {
      change = getLayoutChange(node, pos, state.schema);
    }
  }

  return change;
};

export const fixColumnStructure = (state: EditorState) => {
  const { pos, selectedLayout } = pluginKey.getState(state) as LayoutState;
  if (pos !== null && selectedLayout) {
    const node = state.doc.nodeAt(pos);
    if (node && node.childCount !== getWidthsForPreset(selectedLayout).length) {
      return forceSectionToPresetLayout(state, node, pos, selectedLayout);
    }
  }
  return undefined;
};

export const deleteActiveLayoutNode: Command = (state, dispatch) => {
  const { pos, selectedLayout } = pluginKey.getState(state) as LayoutState;
  if (pos !== null) {
    const node = state.doc.nodeAt(pos) as Node;
    if (dispatch) {
      let tr = state.tr.delete(pos, pos + node.nodeSize);
      tr = addAnalytics(state, tr, {
        action: ACTION.DELETED,
        actionSubject: ACTION_SUBJECT.LAYOUT,
        attributes: { layout: formatLayoutName(<PresetLayout>selectedLayout) },
        eventType: EVENT_TYPE.TRACK,
      });
      dispatch(tr);
    }
    return true;
  }
  return false;
};

const formatLayoutName = (layout: PresetLayout): LAYOUT_TYPE => {
  switch (layout) {
    case 'two_equal':
      return LAYOUT_TYPE.TWO_COLS_EQUAL;
    case 'three_equal':
      return LAYOUT_TYPE.THREE_COLS_EQUAL;
    case 'two_left_sidebar':
      return LAYOUT_TYPE.LEFT_SIDEBAR;
    case 'two_right_sidebar':
      return LAYOUT_TYPE.RIGHT_SIDEBAR;
    case 'three_with_sidebars':
      return LAYOUT_TYPE.THREE_WITH_SIDEBARS;
  }
};
