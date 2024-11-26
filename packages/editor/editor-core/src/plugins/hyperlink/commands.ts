import { LinkAttributes } from '@uidu/adf-schema';
import { Mark, Node, ResolvedPos } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
import { Command } from '../../types';
import { filter, Predicate } from '../../utils/commands';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import { LinkAction, stateKey } from './pm-plugins/main';
import { normalizeUrl } from './utils';

export function isTextAtPos(pos: number): Predicate {
  return (state: EditorState) => {
    const node = state.doc.nodeAt(pos);
    return !!node && node.isText;
  };
}

export function isLinkAtPos(pos: number): Predicate {
  return (state: EditorState) => {
    const node = state.doc.nodeAt(pos);
    return !!node && state.schema.marks.link.isInSet(node.marks);
  };
}

export function setLinkHref(
  href: string,
  pos: number,
  to?: number,
  isTabPressed?: boolean,
): Command {
  return filter(isTextAtPos(pos), (state, dispatch) => {
    const $pos = state.doc.resolve(pos);
    const node = state.doc.nodeAt(pos) as Node;
    const linkMark = state.schema.marks.link;
    const mark = linkMark.isInSet(node.marks) as Mark | undefined;
    const url = normalizeUrl(href);

    if (mark && mark.attrs.href === url) {
      return false;
    }

    const rightBound =
      to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;

    const tr = state.tr.removeMark(pos, rightBound, linkMark);

    if (href.trim()) {
      tr.addMark(
        pos,
        rightBound,
        linkMark.create({
          ...((mark && mark.attrs) || {}),
          href: url,
        }),
      );
    }
    if (!isTabPressed) {
      tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR });
    }

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  });
}

export function updateLink(
  href: string,
  text: string,
  pos: number,
  to?: number,
): Command {
  return (state, dispatch) => {
    const $pos: ResolvedPos = state.doc.resolve(pos);
    const node: Node | null | undefined = state.doc.nodeAt(pos);
    if (!node) {
      return false;
    }
    const url = normalizeUrl(href);

    if (!url) {
      return false;
    }

    const mark: Mark = state.schema.marks.link.isInSet(node.marks);
    const linkMark = state.schema.marks.link;

    const rightBound =
      to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
    const tr = state.tr;
    tr.insertText(text, pos, rightBound);
    // Casting to LinkAttributes to prevent wrong attributes been passed (Example ED-7951)
    const linkAttrs: LinkAttributes = {
      ...((mark && (mark.attrs as LinkAttributes)) || {}),
      href: url,
    };
    tr.addMark(pos, pos + text.length, linkMark.create(linkAttrs));
    tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR });
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

export function setLinkText(text: string, pos: number, to?: number): Command {
  return filter(isLinkAtPos(pos), (state, dispatch) => {
    const $pos = state.doc.resolve(pos);
    const node = state.doc.nodeAt(pos) as Node;
    const mark = state.schema.marks.link.isInSet(node.marks) as Mark;
    if (node && text.length > 0 && text !== node.text) {
      const rightBound =
        to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
      const tr = state.tr;

      tr.insertText(text, pos, rightBound);
      tr.addMark(pos, pos + text.length, mark);
      tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR });

      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  });
}

export function insertLink(
  from: number,
  to: number,
  href: string,
  text?: string,
): Command {
  return (state, dispatch) => {
    const link = state.schema.marks.link;
    if (href.trim()) {
      const { tr } = state;
      const normalizedUrl = normalizeUrl(href);
      const textContent = text || href;

      tr.insertText(textContent, from, to);
      tr.addMark(
        from,
        from + textContent.length,
        link.create({ href: normalizedUrl }),
      );
      tr.setSelection(
        Selection.near(tr.doc.resolve(from + textContent.length)),
      );

      queueCardsFromChangedTr(state, tr, false);

      tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR });
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  };
}

export function removeLink(pos: number): Command {
  return setLinkHref('', pos);
}

export function editInsertedLink(): Command {
  return (state, dispatch) => {
    if (dispatch) {
      dispatch(
        state.tr.setMeta(stateKey, {
          type: LinkAction.EDIT_INSERTED_TOOLBAR,
        }),
      );
    }
    return true;
  };
}

export function showLinkToolbar(): Command {
  return function (state, dispatch) {
    if (dispatch) {
      let tr = state.tr.setMeta(stateKey, {
        type: LinkAction.SHOW_INSERT_TOOLBAR,
      });
      dispatch(tr);
    }
    return true;
  };
}

export function hideLinkToolbar(): Command {
  return function (state, dispatch) {
    if (dispatch) {
      dispatch(state.tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR }));
    }
    return true;
  };
}
