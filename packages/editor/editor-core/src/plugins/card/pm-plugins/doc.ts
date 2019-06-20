import { closeHistory } from 'prosemirror-history';
import { Fragment, Node, Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, Transaction } from 'prosemirror-state';
import { safeInsert } from 'prosemirror-utils';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, addAnalytics, EVENT_TYPE } from '../../../plugins/analytics';
import { Command } from '../../../types';
import { nodesBetweenChanged, processRawValue } from '../../../utils';
import { SmartLinkNodeContext } from '../../analytics/types/smart-links';
import { md } from '../../paste/pm-plugins/main';
import { CardAppearance, CardPluginState, CardReplacementInputMethod, Request } from '../types';
import { appearanceForNodeType } from '../utils';
import { queueCards, resolveCard } from './actions';
import { pluginKey } from './main';



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
  // replace all the outstanding links with their cards
  const pos = tr.mapping.map(request.pos);
  const $pos = tr.doc.resolve(pos);

  const node = tr.doc.nodeAt(pos);
  if (!node || !node.type.isText) {
    return undefined;
  }

  // not a link anymore
  const linkMark = node.marks.find(mark => mark.type.name === 'link');
  if (!linkMark) {
    return undefined;
  }

  const textSlice = node.text;
  const normalizedLinkText = textSlice && md.normalizeLinkText(url);
  if (
    request.compareLinkText &&
    normalizedLinkText !== textSlice &&
    url !== textSlice
  ) {
    return undefined;
  }

  // ED-5638: add an extra space after inline cards to avoid re-rendering them
  const nodes = [cardAdf];
  if (cardAdf.type === inlineCard) {
    nodes.push(schema.text(' '));
  }

  tr.replaceWith(pos, pos + (textSlice || url).length, nodes);

  return $pos.node($pos.depth - 1).type.name;
}

export const replaceQueuedUrlWithCard = (
  url: string,
  cardData: any,
): Command => (editorState, dispatch) => {
  const state = pluginKey.getState(editorState) as CardPluginState | undefined;
  if (!state) {
    return false;
  }

  // find the requests for this URL
  const requests = state.requests.filter(req => req.url === url);

  // try to transform response to ADF
  const schema: Schema = editorState.schema;
  const { inlineCard } = schema.nodes;
  const cardAdf = processRawValue(schema, cardData);

  let tr = editorState.tr;

  if (cardAdf) {
    // Should prevent any other node than cards? [inlineCard, blockCard].includes(cardAdf.type)
    const nodeContexts: Array<string | undefined> = requests
      .map(request => replaceLinksToCards(tr, cardAdf, schema, request))
      .filter(context => !!context); // context exist

    // Send analytics information
    if (nodeContexts.length) {
      const nodeContext = nodeContexts.every(
        context => context === nodeContexts[0],
      )
        ? nodeContexts[0]
        : 'mixed';
      const nodeType = cardAdf.type === inlineCard ? 'inlineCard' : 'blockCard';
      const [, , domainName] = url.split('/');

      addAnalytics(tr, {
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.SMART_LINK,
        eventType: EVENT_TYPE.TRACK,
        attributes: {
          inputMethod:
            requests[0]
              .source /* TODO: what if each request has a different source?
                         unlikely, but need to define behaviour.

                         ignore analytics event? take first? provide 'mixed' as well?*/,
          nodeType,
          nodeContext: nodeContext as SmartLinkNodeContext,
          domainName,
        },
      });
    }
  }

  if (dispatch) {
    dispatch(resolveCard(url)(closeHistory(tr)));
  }
  return true;
};

export const queueCardsFromChangedTr = (
  state: EditorState,
  tr: Transaction,
  source: CardReplacementInputMethod,
  normalizeLinkText: boolean = true,
): Transaction => {
  const { schema } = state;
  const { link } = schema.marks;

  const requests: Request[] = [];
  nodesBetweenChanged(tr, (node, pos) => {
    if (!node.isText) {
      return true;
    }

    const linkMark = node.marks.find(mark => mark.type === link);

    if (linkMark) {
      // ED-6041: compare normalised link text after linkfy from Markdown transformer
      // instead, since it always decodes URL ('%20' -> ' ') on the link text
      if (normalizeLinkText) {
        const normalizedLinkText = md.normalizeLinkText(linkMark.attrs.href);

        // don't bother queueing nodes that have user-defined text for a link
        if (
          node.text !== normalizedLinkText &&
          node.text !== linkMark.attrs.href
        ) {
          return false;
        }
      }

      requests.push({
        url: linkMark.attrs.href,
        pos,
        appearance: 'inline',
        compareLinkText: normalizeLinkText,
        source,
      } as Request);
    }

    return false;
  });

  return queueCards(requests)(tr);
};

export const changeSelectedCardToLink: Command = (state, dispatch) => {
  const selectedNode =
    state.selection instanceof NodeSelection && state.selection.node;
  if (!selectedNode) {
    return false;
  }

  const { link } = state.schema.marks;

  const tr = state.tr.replaceSelectionWith(
    state.schema.text(selectedNode.attrs.url, [
      link.create({ href: selectedNode.attrs.url }),
    ]),
    false,
  );

  if (dispatch) {
    dispatch(tr.scrollIntoView());
  }

  return true;
};

export const setSelectedCardAppearance: (
  appearance: CardAppearance,
) => Command = appearance => (state, dispatch) => {
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
