import { deleteSelection, splitBlock } from 'prosemirror-commands';
import {
  Fragment,
  Node as PMNode,
  ResolvedPos,
  Schema,
  Slice,
} from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  createNewParagraphBelow,
  createParagraphNear,
} from '../../../commands';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import {
  atTheBeginningOfBlock,
  atTheBeginningOfDoc,
  atTheEndOfBlock,
  endPositionOfParent,
  isImage,
  isTemporary,
  moveLeft,
  startPositionOfParent,
} from '../../../utils';
import { walkUpTreeUntil } from '../../../utils/dom';
import { mapSlice } from '../../../utils/slice';
import { MediaProvider, MediaState } from '../types';

export const posOfMediaGroupNearby = (
  state: EditorState,
): number | undefined => {
  return (
    posOfParentMediaGroup(state) ||
    posOfFollowingMediaGroup(state) ||
    posOfPrecedingMediaGroup(state)
  );
};

export const isSelectionNonMediaBlockNode = (state: EditorState): boolean => {
  const { node } = state.selection as NodeSelection;

  return node && node.type !== state.schema.nodes.media && node.isBlock;
};

export const posOfPrecedingMediaGroup = (
  state: EditorState,
): number | undefined => {
  if (!atTheBeginningOfBlock(state)) {
    return undefined;
  }

  return posOfMediaGroupAbove(state, state.selection.$from);
};

const posOfFollowingMediaGroup = (state: EditorState): number | undefined => {
  if (!atTheEndOfBlock(state)) {
    return undefined;
  }
  return posOfMediaGroupBelow(state, state.selection.$to);
};

const posOfMediaGroupAbove = (
  state: EditorState,
  $pos: ResolvedPos,
): number | undefined => {
  let adjacentPos;
  let adjacentNode;

  if (isSelectionNonMediaBlockNode(state)) {
    adjacentPos = $pos.pos;
    adjacentNode = $pos.nodeBefore;
  } else {
    adjacentPos = startPositionOfParent($pos) - 1;
    adjacentNode = state.doc.resolve(adjacentPos).nodeBefore;
  }

  if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
    return adjacentPos - adjacentNode.nodeSize + 1;
  }
  return undefined;
};

/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
export const isInsidePotentialEmptyParagraph = (
  state: EditorState,
): boolean => {
  const { $from } = state.selection;

  return (
    $from.parent.type === state.schema.nodes.paragraph &&
    atTheBeginningOfBlock(state) &&
    atTheEndOfBlock(state)
  );
};

export const posOfMediaGroupBelow = (
  state: EditorState,
  $pos: ResolvedPos,
  prepend: boolean = true,
): number | undefined => {
  let adjacentPos;
  let adjacentNode;

  if (isSelectionNonMediaBlockNode(state)) {
    adjacentPos = $pos.pos;
    adjacentNode = $pos.nodeAfter;
  } else {
    adjacentPos = endPositionOfParent($pos);
    adjacentNode = state.doc.nodeAt(adjacentPos);
  }

  if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
    return prepend ? adjacentPos + 1 : adjacentPos + adjacentNode.nodeSize - 1;
  }
  return undefined;
};

export const posOfParentMediaGroup = (
  state: EditorState,
  $pos?: ResolvedPos,
  prepend: boolean = false,
): number | undefined => {
  const { $from } = state.selection;
  $pos = $pos || $from;

  if ($pos.parent.type === state.schema.nodes.mediaGroup) {
    return prepend
      ? startPositionOfParent($pos)
      : endPositionOfParent($pos) - 1;
  }
  return undefined;
};

/**
 * The function will return the position after current selection where mediaGroup can be inserted.
 */
export function endPositionForMedia(
  state: EditorState,
  resolvedPos: ResolvedPos,
): number {
  const { mediaGroup } = state.schema.nodes;
  let i = resolvedPos.depth;
  for (; i > 1; i--) {
    const nodeType = resolvedPos.node(i).type;
    if (nodeType.validContent(Fragment.from(mediaGroup.create()))) {
      break;
    }
  }
  return resolvedPos.end(i) + 1;
}

export const removeMediaNode = (
  view: EditorView,
  node: PMNode,
  getPos: ProsemirrorGetPosHandler,
) => {
  const { id } = node.attrs;
  const { state } = view;
  const { tr, selection, doc } = state;

  const currentMediaNodePos = getPos();
  tr.deleteRange(currentMediaNodePos, currentMediaNodePos + node.nodeSize);

  if (isTemporary(id)) {
    tr.setMeta('addToHistory', false);
  }

  view.dispatch(tr);

  const $currentMediaNodePos = doc.resolve(currentMediaNodePos);
  const isLastMediaNode =
    $currentMediaNodePos.index() === $currentMediaNodePos.parent.childCount - 1;

  // If deleting a selected media node, we need to tell where the cursor to go next.
  // Prosemirror didn't gave us the behaviour of moving left if the media node is not the last one.
  // So we handle it ourselves.
  if (
    selection.from === currentMediaNodePos &&
    !isLastMediaNode &&
    !atTheBeginningOfDoc(state)
  ) {
    moveLeft(view);
  }
};

export const splitMediaGroup = (view: EditorView): boolean => {
  const { selection } = view.state;

  // if selection is not a media node, do nothing.
  if (
    !(selection instanceof NodeSelection) ||
    selection.node.type !== view.state.schema.nodes.media
  ) {
    return false;
  }

  deleteSelection(view.state, view.dispatch);

  if (selection.$to.nodeAfter) {
    splitBlock(view.state, view.dispatch);
    createParagraphNear(false)(view.state, view.dispatch);
  } else {
    createNewParagraphBelow(view.state, view.dispatch);
  }

  return true;
};

const isOptionalAttr = (attr: string) =>
  attr.length > 1 && attr[0] === '_' && attr[1] === '_';

export const copyOptionalAttrsFromMediaState = (
  mediaState: MediaState,
  node: PMNode,
) => {
  Object.keys(node.attrs)
    .filter(isOptionalAttr)
    .forEach(key => {
      const mediaStateKey = key.substring(2);
      const attrValue = mediaState[mediaStateKey as keyof typeof mediaState];
      if (attrValue !== undefined) {
        node.attrs[key] = attrValue;
      }
    });
};

/**
 * Customer can define either deprecated Context or MediaClientConfig object directly. All internal
 * API are being switched to MediaClientConfig exclusively.
 * This utility helps to retrieve MediaClientConfig object from media Provider no matter what customer
 * has provided.
 */
export const getViewMediaClientConfigFromMediaProvider = async (
  mediaProvider: MediaProvider,
): Promise<any> => {
  if (mediaProvider.viewContext) {
    return (await mediaProvider.viewContext).config;
  } else {
    // We can use ! here since XOR would not allow MediaProvider object created without one of the properties.
    return (mediaProvider as any).viewMediaClientConfig!;
  }
};

/**
 * Customer can define either deprecated Context or MediaClientConfig object directly. All internal
 * API are being switched to MediaClientConfig exclusively.
 * This utility helps to retrieve MediaClientConfig object from media Provider no matter what customer
 * has provided.
 */
export const getUploadMediaClientConfigFromMediaProvider = async (
  mediaProvider: MediaProvider,
): Promise<any | undefined> => {
  if (mediaProvider.uploadContext) {
    return (await mediaProvider.uploadContext).config;
  } else if ((mediaProvider as any).uploadMediaClientConfig) {
    return (mediaProvider as any).uploadMediaClientConfig;
  } else {
    return undefined;
  }
};

export const transformSliceToCorrectMediaWrapper = (
  slice: Slice,
  schema: Schema,
) => {
  const { mediaGroup, mediaSingle, media } = schema.nodes;
  return mapSlice(slice, (node, parent) => {
    if (!parent && node.type === media) {
      if (
        mediaSingle &&
        (isImage(node.attrs.__fileMimeType) || node.attrs.type === 'external')
      ) {
        return mediaSingle.createChecked({}, node);
      } else {
        return mediaGroup.createChecked({}, [node]);
      }
    }

    return node;
  });
};

/**
 * Check base styles to see if an element will be invisible when rendered in a document.
 * @param element
 */
const isElementInvisible = (element: HTMLElement) => {
  return (
    element.style.opacity === '0' ||
    element.style.display === 'none' ||
    element.style.visibility === 'hidden'
  );
};

/**
 * Given a html string, we attempt to hoist any nested `<img>` tags,
 * not wrapped by a `<div>` as ProseMirror no-op's on those scenarios.
 * @param html
 */
export const unwrapNestedMediaElements = (html: string) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  const imageTags = wrapper.querySelectorAll('img');
  if (!imageTags.length) {
    return html;
  }

  imageTags.forEach(imageTag => {
    // Capture the immediate parent, we may remove the media from here later.
    const mediaParent = imageTag.parentElement;
    if (!mediaParent) {
      return;
    }

    // If either the parent or the image itself contains styles that would make
    // them invisible on copy, dont paste them.
    if (isElementInvisible(mediaParent) || isElementInvisible(imageTag)) {
      mediaParent.removeChild(imageTag);
      return;
    }

    // If its wrapped by a div we assume its safe to bypass.
    // ProseMirror should handle this case properly.
    if (mediaParent instanceof HTMLDivElement) {
      return;
    }

    // Find the top most parent before we have our faux created element.
    const rootElement = walkUpTreeUntil(mediaParent, wrapper);

    // Here we try to insert the media right after its top most parent element
    // Unless its the last element in our structure then we will insert above it.
    if (rootElement) {
      // Only remove the media if we have somewhere else to place it.
      mediaParent.removeChild(imageTag);
      // Attempt to clean up lines left behind by the image
      mediaParent.innerText = mediaParent.innerText.trim();

      // Insert as close as possible to the root element's index in the tree.
      wrapper.insertBefore(
        imageTag,
        rootElement.nextElementSibling || rootElement,
      );
    }
  });

  return wrapper.innerHTML;
};
