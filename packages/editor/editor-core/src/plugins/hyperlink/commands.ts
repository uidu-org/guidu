import { Command } from '../../types';
import { normalizeUrl } from './utils';
import {
  stateKey,
  LinkAction,
  canLinkBeCreatedInRange,
} from './pm-plugins/main';
import { EditorState, Selection } from 'prosemirror-state';
import { filter, Predicate } from '../../utils/commands';
import { Mark, Node, ResolvedPos } from 'prosemirror-model';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../analytics';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';

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
    const mark: Mark = state.schema.marks.link.isInSet(node.marks);
    const linkMark = state.schema.marks.link;

    const rightBound =
      to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
    const tr = state.tr;
    tr.insertText(text, pos, rightBound);
    tr.addMark(
      pos,
      pos + text.length,
      linkMark.create({
        ...((mark && mark.attrs) || {}),
        href,
      }),
    );
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
  source?: INPUT_METHOD.MANUAL | INPUT_METHOD.TYPEAHEAD,
): Command {
  return filter(canLinkBeCreatedInRange(from, to), (state, dispatch) => {
    const link = state.schema.marks.link;
    if (href.trim()) {
      const { tr } = state;
      if (from === to) {
        const textContent = text || href;
        tr.insertText(textContent, from, to);
        tr.addMark(
          from,
          from + textContent.length,
          link.create({ href: normalizeUrl(href) }),
        );
      } else {
        tr.addMark(from, to, link.create({ href: normalizeUrl(href) }));
        tr.setSelection(Selection.near(tr.doc.resolve(to)));
      }

      queueCardsFromChangedTr(state, tr, source!, false);

      tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR });
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  });
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

export function showLinkToolbar(
  inputMethod:
    | INPUT_METHOD.TOOLBAR
    | INPUT_METHOD.QUICK_INSERT
    | INPUT_METHOD.SHORTCUT
    | INPUT_METHOD.INSERT_MENU = INPUT_METHOD.TOOLBAR,
): Command {
  return function(state, dispatch) {
    if (dispatch) {
      let tr = state.tr.setMeta(stateKey, {
        type: LinkAction.SHOW_INSERT_TOOLBAR,
      });
      tr = addAnalytics(tr, {
        action: ACTION.INVOKED,
        actionSubject: ACTION_SUBJECT.TYPEAHEAD,
        actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
        attributes: { inputMethod },
        eventType: EVENT_TYPE.UI,
      });
      dispatch(tr);
    }
    return true;
  };
}

export function hideLinkToolbar(): Command {
  return function(state, dispatch) {
    if (dispatch) {
      dispatch(state.tr.setMeta(stateKey, { type: LinkAction.HIDE_TOOLBAR }));
    }
    return true;
  };
}
