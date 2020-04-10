import { MediaSingleAttributes, MediaSingleLayout } from '@uidu/adf-schema';
import {
  akEditorBreakoutPadding,
  breakoutWideScaleRatio,
  calcPxFromPct,
} from '@uidu/editor-common';
import { Fragment, Node as PMNode, Schema, Slice } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
import { hasParentNodeOfType, safeInsert } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { Command } from '../../../types';
import {
  atTheBeginningOfBlock,
  checkNodeDown,
  isEmptyParagraph,
  isImage,
} from '../../../utils';
import { getParentNodeWidth } from '../../../utils/node-width';
import { mapSlice } from '../../../utils/slice';
import { WidthPluginState } from '../../width';
import { MediaState } from '../types';
import { alignmentLayouts } from '../ui/ResizableMediaSingle/utils';
import { copyOptionalAttrsFromMediaState } from '../utils/media-common';

export interface MediaSingleState extends MediaState {
  dimensions: { width: number; height: number };
  scaleFactor?: number;
}

function shouldAddParagraph(state: EditorState) {
  return (
    atTheBeginningOfBlock(state) &&
    !checkNodeDown(state.selection, state.doc, isEmptyParagraph)
  );
}

function insertNodesWithOptionalParagraph(nodes: PMNode[]): Command {
  return function (state, dispatch) {
    const { tr, schema } = state;
    const { paragraph } = schema.nodes;

    let openEnd = 0;
    if (shouldAddParagraph(state)) {
      nodes.push(paragraph.create());
      openEnd = 1;
    }

    tr.replaceSelection(new Slice(Fragment.from(nodes), 0, openEnd));

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

export const isMediaSingle = (schema: Schema, fileMimeType?: string) =>
  !!schema.nodes.mediaSingle && isImage(fileMimeType);

export const insertMediaAsMediaSingle = (
  view: EditorView,
  node: PMNode,
  inputMethod: any,
): boolean => {
  const { state, dispatch } = view;
  const { mediaSingle, media } = state.schema.nodes;

  if (!mediaSingle) {
    return false;
  }

  // if not an image type media node
  if (
    node.type !== media ||
    (!isImage(node.attrs.__fileMimeType) && node.attrs.type !== 'external')
  ) {
    return false;
  }

  const mediaSingleNode = mediaSingle.create({}, node);
  const nodes = [mediaSingleNode];
  return insertNodesWithOptionalParagraph(nodes)(state, dispatch);
};

export const insertMediaSingleNode = (
  view: EditorView,
  mediaState: MediaState,
): boolean => {
  const { state, dispatch } = view;
  const grandParent = state.selection.$from.node(-1);
  const node = createMediaSingleNode(state.schema)(
    mediaState as MediaSingleState,
  );
  console.log(node);
  const shouldSplit =
    grandParent && grandParent.type.validContent(Fragment.from(node));

  if (shouldSplit) {
    insertNodesWithOptionalParagraph([node])(state, dispatch);
  } else {
    dispatch(
      safeInsert(
        shouldAddParagraph(view.state)
          ? Fragment.fromArray([node, state.schema.nodes.paragraph.create()])
          : node,
      )(state.tr),
    );
  }

  return true;
};

export const createMediaSingleNode = (schema: Schema) => (
  mediaState: MediaSingleState,
) => {
  const { url, data } = mediaState;
  const { id, metadata, scaleFactor = 1 } = data;
  const { width, height } = metadata || {
    height: undefined,
    width: undefined,
  };
  const { media, mediaSingle } = schema.nodes;

  const mediaNode = media.create({
    id,
    type: 'file',
    file: {
      id,
      type: 'image',
      width: width && Math.round(width / scaleFactor),
      height: height && Math.round(height / scaleFactor),
      url,
    },
  });

  copyOptionalAttrsFromMediaState(mediaState, mediaNode);
  return mediaSingle.createChecked({}, mediaNode);
};

export function transformSliceForMedia(slice: Slice, schema: Schema) {
  const {
    mediaSingle,
    layoutSection,
    table,
    bulletList,
    orderedList,
  } = schema.nodes;

  return (selection: Selection) => {
    if (
      hasParentNodeOfType([layoutSection, table, bulletList, orderedList])(
        selection,
      )
    ) {
      return mapSlice(slice, (node) =>
        node.type.name === 'mediaSingle'
          ? mediaSingle.createChecked({}, node.content, node.marks)
          : node,
      );
    }

    return slice;
  };
}

export const alignAttributes = (
  layout: MediaSingleLayout,
  oldAttrs: MediaSingleAttributes,
  gridSize: number = 12,
): MediaSingleAttributes => {
  let width = oldAttrs.width;
  const oldLayout: MediaSingleLayout = oldAttrs.layout;
  const wrappedLayouts: MediaSingleLayout[] = [
    'wrap-left',
    'wrap-right',
    'align-end',
    'align-start',
  ];

  if (
    (!width || width === 100) &&
    ['align-start', 'align-end', 'wrap-left', 'wrap-right'].indexOf(
      oldLayout,
    ) === -1 &&
    ['align-start', 'align-end', 'wrap-left', 'wrap-right'].indexOf(layout) > -1
  ) {
    width = 50;
  } else if (
    layout !== oldLayout &&
    ['full-width', 'wide'].indexOf(oldLayout) > -1
  ) {
    // unset width
    width = undefined;
  } else if (width) {
    const cols = Math.round((width / 100) * gridSize);
    let targetCols = cols;

    const nonWrappedLayouts: MediaSingleLayout[] = [
      'center',
      'wide',
      'full-width',
    ];

    if (
      wrappedLayouts.indexOf(oldLayout) > -1 &&
      nonWrappedLayouts.indexOf(layout) > -1
    ) {
      // wrap -> center needs to align to even grid
      targetCols = Math.floor(targetCols / 2) * 2;
    } else if (
      nonWrappedLayouts.indexOf(oldLayout) > -1 &&
      wrappedLayouts.indexOf(layout) > -1
    ) {
      // cannot resize to full column width, and cannot resize to 1 column

      if (cols <= 1) {
        targetCols = 2;
      } else if (cols >= gridSize) {
        targetCols = 10;
      }
    }

    if (targetCols !== cols) {
      width = (targetCols / gridSize) * 100;
    }
  }

  return {
    ...oldAttrs,
    layout,
    width,
  };
};

export const calcMediaPxWidth = (opts: {
  origWidth: number;
  origHeight: number;
  state: EditorState;
  containerWidth: WidthPluginState;
  layout?: string;
  pctWidth?: number;
  pos?: number;
  isFullWidthModeEnabled?: boolean;
}): number => {
  const {
    origWidth,
    origHeight,
    layout,
    pctWidth,
    containerWidth,
    isFullWidthModeEnabled,
    pos,
    state,
  } = opts;
  const { width, lineLength } = containerWidth;
  const nestedWidth = getParentNodeWidth(
    pos,
    state,
    containerWidth,
    isFullWidthModeEnabled,
  );
  const calculatedPctWidth =
    pctWidth && origWidth && origHeight
      ? Math.ceil(calcPxFromPct(pctWidth / 100, lineLength || width))
      : undefined;

  if (nestedWidth) {
    return Math.min(calculatedPctWidth || origWidth, nestedWidth);
  } else if (layout === 'wide') {
    if (lineLength) {
      const wideWidth = Math.ceil(lineLength * breakoutWideScaleRatio);
      return wideWidth > width ? lineLength : wideWidth;
    }
  } else if (layout === 'full-width') {
    return width - akEditorBreakoutPadding;
  } else if (calculatedPctWidth) {
    return calculatedPctWidth;
  } else if (layout === 'center') {
    return Math.min(origWidth, lineLength || width);
  } else if (layout && alignmentLayouts.indexOf(layout) !== -1) {
    const halfLineLength = Math.ceil((lineLength || width) / 2);
    return origWidth <= halfLineLength ? origWidth : halfLineLength;
  }

  return origWidth;
};
