import { UpdateExtension } from '@uidu/editor-common';
import { Node as PmNode, Schema, Slice } from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import {
  findParentNodeOfType,
  findSelectedNodeOfType,
  removeParentNodeOfType,
  removeSelectedNode,
  replaceSelectedNode,
} from 'prosemirror-utils';
import { Command, CommandDispatch } from '../../types';
import { mapFragment } from '../../utils/slice';
import { insertMacroFromMacroBrowser, MacroProvider } from '../macro';
import { pluginKey } from './plugin';
import { getExtensionNode, isSelectionNodeExtension } from './utils';

export const updateExtensionLayout = (layout: string): Command => (
  state,
  dispatch,
) => {
  const { selection, schema, tr } = state;
  const { bodiedExtension, extension, inlineExtension } = schema.nodes;
  const parentExtNode = findParentNodeOfType([bodiedExtension])(selection);

  let extPosition;
  let extNode;

  const selectedNode = findSelectedNodeOfType([
    bodiedExtension,
    inlineExtension,
    extension,
  ])(selection);

  if (!parentExtNode && !selectedNode) {
    return false;
  }

  if (selectedNode) {
    extPosition = selectedNode.pos;
    extNode = selectedNode.node;
  } else {
    extPosition = parentExtNode!.pos;
    extNode = parentExtNode!.node;
  }

  const pluginState = pluginKey.getState(state);

  tr.setNodeMarkup(extPosition, undefined, {
    ...extNode!.attrs,
    layout,
  }).setMeta(pluginKey, { ...pluginState, layout });

  if (dispatch) {
    dispatch(tr);
  }

  return true;
};

export const updateExtensionParams = (
  updateExtension: UpdateExtension<object>,
  node: { node: PmNode; pos: number },
) => async (state: EditorState, dispatch?: CommandDispatch): Promise<void> => {
  if (!state.schema.nodes.extension) {
    return;
  }
  const { parameters } = node.node.attrs;
  const newParameters = await updateExtension(parameters);

  if (newParameters) {
    const newAttrs = {
      ...node.node.attrs,
      parameters: {
        ...parameters,
        ...newParameters,
      },
    };

    const newNode = state.schema.nodes.extension.createChecked(newAttrs);
    if (!newNode) {
      return;
    }

    let transaction = replaceSelectedNode(newNode)(state.tr);
    // Replacing selected node doesn't update the selection. `selection.node` still returns the old node
    transaction = transaction.setSelection(
      NodeSelection.create(transaction.doc, state.selection.anchor),
    );

    if (dispatch) {
      dispatch(transaction.scrollIntoView());
    }
  }
};

export const editExtension = (
  macroProvider: MacroProvider | null,
  updateExtension?: UpdateExtension<object>,
): Command => (state, dispatch): boolean => {
  const node = getExtensionNode(state);

  if (!node) {
    return false;
  }

  if (updateExtension) {
    updateExtensionParams(updateExtension, node)(state, dispatch);
    return true;
  }

  if (!macroProvider) {
    return false;
  }

  insertMacroFromMacroBrowser(macroProvider, node.node, true)(state, dispatch);
  return true;
};

export const removeExtension = (): Command => (state, dispatch) => {
  const { schema, selection } = state;
  const pluginState = pluginKey.getState(state);
  let tr = state.tr.setMeta(pluginKey, { ...pluginState, element: null });

  if (isSelectionNodeExtension(selection, schema)) {
    tr = removeSelectedNode(tr);
  } else {
    tr = removeParentNodeOfType(schema.nodes.bodiedExtension)(tr);
  }

  if (dispatch) {
    dispatch(tr);
  }

  return true;
};

/**
 * Lift content out of "open" top-level bodiedExtensions.
 * Will not work if bodiedExtensions are nested, or when bodiedExtensions are not in the top level
 */
export const transformSliceToRemoveOpenBodiedExtension = (
  slice: Slice,
  schema: Schema,
) => {
  const { bodiedExtension } = schema.nodes;

  const fragment = mapFragment(slice.content, (node, parent, index) => {
    if (node.type === bodiedExtension && !parent) {
      const currentNodeIsAtStartAndIsOpen = slice.openStart && index === 0;
      const currentNodeIsAtEndAndIsOpen =
        slice.openEnd && index + 1 === slice.content.childCount;

      if (currentNodeIsAtStartAndIsOpen || currentNodeIsAtEndAndIsOpen) {
        return node.content;
      }
    }
    return node;
  });

  // If the first/last child has changed - then we know we've removed a bodied extension & to decrement the open depth
  return new Slice(
    fragment,
    fragment.firstChild &&
    fragment.firstChild!.type !== slice.content.firstChild!.type
      ? slice.openStart - 1
      : slice.openStart,
    fragment.lastChild &&
    fragment.lastChild!.type !== slice.content.lastChild!.type
      ? slice.openEnd - 1
      : slice.openEnd,
  );
};
