import { LinkAttributes } from '@uidu/adf-schema';
import { MarkType, Node } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { createToggleBlockMarkOnRange } from '../../../commands';
import { CommandDispatch } from '../../../types/command';
import { normalizeUrl } from '../../hyperlink/utils';
import {
  createMediaLinkingCommand,
  getMediaLinkingState,
} from '../pm-plugins/linking';
import { MediaLinkingActionsTypes } from '../pm-plugins/linking/actions';

export const showLinkingToolbar = createMediaLinkingCommand((state) => {
  const mediaLinkingState = getMediaLinkingState(state);
  if (mediaLinkingState && mediaLinkingState.mediaPos !== null) {
    const mediaSingle = state.doc.nodeAt(mediaLinkingState.mediaPos);
    if (mediaSingle) {
      return {
        type: MediaLinkingActionsTypes.showToolbar,
      };
    }
  }
  return false;
});

const hideLinkingToolbarCommand = createMediaLinkingCommand({
  type: MediaLinkingActionsTypes.hideToolbar,
});
export const hideLinkingToolbar = (
  state: EditorState,
  dispatch?: CommandDispatch,
  view?: EditorView,
) => {
  hideLinkingToolbarCommand(state, dispatch, view);

  // restore focus on the editor so keyboard shortcuts aren't lost to the browser
  if (view) {
    view.focus();
  }
};

interface CreateToggleLinkMarkOptions {
  forceRemove?: boolean;
  url?: string;
}
function getCurrentUrl(state: EditorState): string | undefined {
  const { link: linkType }: { link: MarkType } = state.schema.marks;
  const mediaLinkingState = getMediaLinkingState(state);
  if (!mediaLinkingState || mediaLinkingState.mediaPos === null) {
    return undefined;
  }
  const $pos = state.doc.resolve(mediaLinkingState.mediaPos);
  const node = state.doc.nodeAt($pos.pos) as Node;

  if (!node) {
    return undefined;
  }

  const hasLink = linkType.isInSet(node.marks);
  if (!hasLink) {
    return undefined;
  }
  const link = node.marks.find((mark) => mark.type === linkType)!; // Already check exist
  const url = (link.attrs as LinkAttributes).href;

  return url;
}

function toggleLinkMark(
  tr: Transaction,
  state: EditorState,
  { forceRemove = false, url }: CreateToggleLinkMarkOptions,
) {
  const mediaLinkingState = getMediaLinkingState(state);
  if (!mediaLinkingState || mediaLinkingState.mediaPos === null) {
    return tr;
  }
  const $pos = state.doc.resolve(mediaLinkingState.mediaPos);
  const node = state.doc.nodeAt($pos.pos) as Node;

  if (!node) {
    return tr;
  }

  const linkMark = state.schema.marks.link;
  const { mediaSingle } = state.schema.nodes;
  const toggleBlockLinkMark = createToggleBlockMarkOnRange<LinkAttributes>(
    linkMark,
    (prevAttrs, node) => {
      // Only add mark to media single
      if (!node || node.type !== mediaSingle) {
        return undefined; //No op
      }
      if (forceRemove) {
        return false;
      }
      const href = normalizeUrl(url);

      if (prevAttrs && prevAttrs.href === href) {
        return undefined; //No op
      }

      if (href.trim() === '') {
        return false; // remove
      }

      return {
        ...prevAttrs,
        href: href,
      };
    },
    [mediaSingle],
  );
  toggleBlockLinkMark($pos.pos, $pos.pos + node.nodeSize - 1, tr, state);

  return tr;
}

export const unlink = createMediaLinkingCommand(
  {
    type: MediaLinkingActionsTypes.unlink,
  },
  (tr, state) => {
    return toggleLinkMark(tr, state, { forceRemove: true });
  },
);

export const setUrlToMedia = (url: string) =>
  createMediaLinkingCommand(
    {
      type: MediaLinkingActionsTypes.setUrl,
      payload: normalizeUrl(url),
    },
    (tr, state) => {
      return toggleLinkMark(tr, state, { url: url });
    },
  );
