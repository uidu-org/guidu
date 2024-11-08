import { Transaction } from 'prosemirror-state';
import { createCommand } from '.';
import {
  getMediaNodeFromSelection,
  isSelectionMediaSingleNode,
} from '../../utils/media-common';

export const closeMediaAltTextMenu = createCommand((state) => {
  if (isSelectionMediaSingleNode(state)) {
    return { type: 'closeMediaAltTextMenu' };
  }
  return false;
});

export const openMediaAltTextMenu = createCommand(
  (state) => {
    if (isSelectionMediaSingleNode(state)) {
      return { type: 'openMediaAltTextMenu' };
    }
    return false;
  },
  (tr: Transaction) => tr.setMeta('scrollIntoView', false),
);

export const updateAltText = (newAltText: string | null) =>
  createCommand(
    (state) =>
      isSelectionMediaSingleNode(state) ? { type: 'updateAltText' } : false,
    (tr, state) => {
      const mediaNode = getMediaNodeFromSelection(state);
      const pos = tr.selection.from + 1;
      if (mediaNode) {
        tr.setMeta('scrollIntoView', false);
        tr.setNodeMarkup(pos, undefined, {
          ...mediaNode.attrs,
          alt: newAltText,
        });
      }

      return tr;
    },
  );
