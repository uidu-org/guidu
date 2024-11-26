import { isSafeUrl } from '@uidu/adf-schema';
import { closeHistory } from 'prosemirror-history';
import { Fragment, Node, Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, Transaction } from 'prosemirror-state';
import { safeInsert } from 'prosemirror-utils';
import { Command } from '../../../types';
import { nodesBetweenChanged } from '../../../utils';
import { md } from '../../paste/pm-plugins/main';
import { CardAppearance, CardPluginState, Request } from '../types';
import { appearanceForNodeType } from '../utils';
import { queueCards, resolveCard } from './actions';
import { pluginKey } from './main';

export function shouldReplace(
  node: Node,
  compareLinkText: boolean = true,
  compareToUrl?: string,
) {
  const linkMark = node.marks.find((mark) => mark.type.name === 'link');
  if (!linkMark) {
    // not a link anymore
    return false;
  }

  // ED-6041: compare normalised link text after linkfy from Markdown transformer
  // instead, since it always decodes URL ('%20' -> ' ') on the link text
  const normalisedHref = md.normalizeLinkText(linkMark.attrs.href);
  const normalizedLinkText = md.normalizeLinkText(node.text || '');

  if (compareLinkText && normalisedHref !== normalizedLinkText) {
    return false;
  }

  if (compareToUrl) {
    const normalizedUrl = md.normalizeLinkText(compareToUrl);
    if (normalizedUrl !== normalisedHref) {
      return false;
    }
  }

  return true;
}

export function insertCard(tr: Transaction, cardAdf: Node, schema: Schema) {
  const { inlineCard } = schema.nodes;

  // ED-5638: add an extra space after inline cards to avoid re-rendering them
  const nodes = [cardAdf];
  if (cardAdf.type === inlineCard) {
    nodes.push(schema.text(' '));
  }

  return safeInsert(Fragment.fromArray(nodes))(tr);
}

/**
 * Attempt to replace the link into the respective card.
 */
function replaceLinksToCards(
  tr: Transaction,
  cardAdf: Node,
  schema: Schema,
  request: Request,
): string | undefined {
  const { inlineCard } = schema.nodes;
  const { url } = request;

  if (!isSafeUrl(url)) {
    return undefined;
  }

  // replace all the outstanding links with their cards
  const pos = tr.mapping.map(request.pos);
  const $pos = tr.doc.resolve(pos);

  const node = tr.doc.nodeAt(pos);
  if (!node || !node.type.isText) {
    return undefined;
  }

  if (!shouldReplace(node, request.compareLinkText, url)) {
    return undefined;
  }

  // ED-5638: add an extra space after inline cards to avoid re-rendering them
  const nodes = [cardAdf];
  if (cardAdf.type === inlineCard) {
    nodes.push(schema.text(' '));
  }

  tr.replaceWith(pos, pos + (node.text || url).length, nodes);

  return $pos.node($pos.depth - 1).type.name;
}

export const replaceQueuedUrlWithCard =
  (url: string, cardData: any): Command =>
  (editorState, dispatch) => {
    const state = pluginKey.getState(editorState) as
      | CardPluginState
      | undefined;
    if (!state) {
      return false;
    }

    if (dispatch) {
      dispatch(resolveCard(url)(closeHistory(tr)));
    }
    return true;
  };

export const queueCardsFromChangedTr = (
  state: EditorState,
  tr: Transaction,
  normalizeLinkText: boolean = true,
): Transaction => {
  const { schema } = state;
  const { link } = schema.marks;

  const requests: Request[] = [];
  nodesBetweenChanged(tr, (node, pos) => {
    if (!node.isText) {
      return true;
    }

    const linkMark = node.marks.find((mark) => mark.type === link);

    if (linkMark) {
      if (!shouldReplace(node, normalizeLinkText)) {
        return false;
      }

      requests.push({
        url: linkMark.attrs.href,
        pos,
        appearance: 'inline',
        compareLinkText: normalizeLinkText,
      } as Request);
    }

    return false;
  });

  return queueCards(requests)(tr);
};

export const changeSelectedCardToLink =
  (text?: string, href?: string): Command =>
  (state, dispatch) => {
    const selectedNode =
      state.selection instanceof NodeSelection && state.selection.node;
    if (!selectedNode) {
      return false;
    }

    const { link } = state.schema.marks;
    const url = selectedNode.attrs.url || selectedNode.attrs.data.url;

    const tr = state.tr.replaceSelectionWith(
      state.schema.text(text || url, [link.create({ href: href || url })]),
      false,
    );

    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }

    return true;
  };

export const changeSelectedCardToText =
  (text: string): Command =>
  (state, dispatch) => {
    const selectedNode =
      state.selection instanceof NodeSelection && state.selection.node;
    if (!selectedNode) {
      return false;
    }

    const tr = state.tr.replaceSelectionWith(state.schema.text(text), false);

    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }

    return true;
  };

export const setSelectedCardAppearance: (
  appearance: CardAppearance,
) => Command = (appearance) => (state, dispatch) => {
  const selectedNode =
    state.selection instanceof NodeSelection && state.selection.node;
  if (!selectedNode) {
    return false;
  }

  if (appearanceForNodeType(selectedNode.type) === appearance) {
    return false;
  }

  const { inlineCard, blockCard } = state.schema.nodes;
  const pos = state.selection.from;

  if (appearance === 'block' && state.selection.$from.parent.childCount === 1) {
    const tr = state.tr.replaceRangeWith(
      pos - 1,
      pos + selectedNode.nodeSize + 1,
      blockCard.createChecked(
        selectedNode.attrs,
        undefined,
        selectedNode.marks,
      ),
    );

    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  const tr = state.tr.setNodeMarkup(
    pos,
    appearance === 'inline' ? inlineCard : blockCard,
    selectedNode.attrs,
    selectedNode.marks,
  );

  if (dispatch) {
    dispatch(tr.scrollIntoView());
  }

  return true;
};
