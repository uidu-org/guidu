import { isSafeUrl } from '@uidu/adf-schema';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { ProviderFactory } from '@uidu/editor-common';
import { Node } from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { removeSelectedNode } from 'prosemirror-utils';
import { defineMessages, IntlShape } from 'react-intl';
import { analyticsService } from '../../analytics';
import commonMessages, { linkToolbarMessages } from '../../messages';
import { Command } from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  AnalyticsEventPayload,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../floating-toolbar/types';
import { changeSelectedCardToText } from './pm-plugins/doc';
import { pluginKey } from './pm-plugins/main';
import { CardPluginState } from './types';
import {
  buildEditLinkToolbar,
  editLink,
  editLinkToolbarConfig,
} from './ui/EditLinkToolbar';
import {
  displayInfoForCard,
  findCardInfo,
  titleUrlPairFromNode,
} from './utils';

export const messages = defineMessages({
  block: {
    id: 'fabric.editor.displayBlock',
    defaultMessage: 'Display as card',
    description:
      'Display link as a card with a rich preview similar to in a Facebook feed with page title, description, and potentially an image.',
  },
  inline: {
    id: 'fabric.editor.displayInline',
    defaultMessage: 'Display as link',
    description: 'Display link with the title only.',
  },
  link: {
    id: 'fabric.editor.displayLink',
    defaultMessage: 'Display as text',
    description: 'Convert the card to become a regular text-based hyperlink.',
  },
});

export const removeCard: Command = (state, dispatch) => {
  if (!(state.selection instanceof NodeSelection)) {
    return false;
  }

  const type = state.selection.node.type.name;
  const payload: AnalyticsEventPayload = {
    action: ACTION.DELETED,
    actionSubject: ACTION_SUBJECT.SMART_LINK,
    actionSubjectId: type as
      | ACTION_SUBJECT_ID.CARD_INLINE
      | ACTION_SUBJECT_ID.CARD_BLOCK,
    attributes: {
      inputMethod: INPUT_METHOD.TOOLBAR,
      displayMode: type as
        | ACTION_SUBJECT_ID.CARD_INLINE
        | ACTION_SUBJECT_ID.CARD_BLOCK,
    },
    eventType: EVENT_TYPE.TRACK,
  };
  if (dispatch) {
    dispatch(addAnalytics(removeSelectedNode(state.tr), payload));
  }
  analyticsService.trackEvent('atlassian.editor.format.card.delete.button');
  return true;
};

export const visitCardLink: Command = (state, dispatch) => {
  if (!(state.selection instanceof NodeSelection)) {
    return false;
  }

  const { type } = state.selection.node;
  const { url } = titleUrlPairFromNode(state.selection.node);

  const payload: AnalyticsEventPayload = {
    action: ACTION.VISITED,
    actionSubject: ACTION_SUBJECT.SMART_LINK,
    actionSubjectId: type.name as
      | ACTION_SUBJECT_ID.CARD_INLINE
      | ACTION_SUBJECT_ID.CARD_BLOCK,
    attributes: {
      inputMethod: INPUT_METHOD.TOOLBAR,
    },
    eventType: EVENT_TYPE.TRACK,
  };

  // All card links should open in the same tab per https://product-fabric.atlassian.net/browse/MS-1583.
  analyticsService.trackEvent('atlassian.editor.format.card.visit.button');
  // We are in edit mode here, open the smart card URL in a new window.
  window.open(url);

  if (dispatch) {
    dispatch(addAnalytics(state.tr, payload));
  }
  return true;
};

const unlinkCard = (node: Node, state: EditorState): Command => {
  const displayInfo = displayInfoForCard(node, findCardInfo(state));
  const text = displayInfo.title || displayInfo.url;
  if (text) {
    return changeSelectedCardToText(text);
  }

  return () => false;
};

const generateDeleteButton = (
  node: Node,
  state: EditorState,
  intl: IntlShape,
): FloatingToolbarItem<Command> => {
  const { inlineCard } = state.schema.nodes;

  if (node.type === inlineCard) {
    return {
      type: 'button',
      title: intl.formatMessage(linkToolbarMessages.unlink),
      icon: UnlinkIcon,
      onClick: unlinkCard(node, state),
    };
  }

  return {
    type: 'button',
    appearance: 'danger',
    icon: RemoveIcon,
    onMouseEnter: hoverDecoration(node.type, true),
    onMouseLeave: hoverDecoration(node.type, false),
    title: intl.formatMessage(commonMessages.remove),
    onClick: removeCard,
  };
};

const generateToolbarItems = (
  state: EditorState,
  intl: IntlShape,
  providerFactory: ProviderFactory,
) => (node: Node): Array<FloatingToolbarItem<Command>> => {
  const { url } = titleUrlPairFromNode(node);
  if (url && !isSafeUrl(url)) {
    return [];
  }

  const pluginState: CardPluginState = pluginKey.getState(state);

  if (pluginState.showLinkingToolbar) {
    return [
      buildEditLinkToolbar({
        providerFactory,
        node,
      }),
    ];
  } else {
    return [
      {
        type: 'button',
        selected: false,
        title: intl.formatMessage(linkToolbarMessages.editLink),
        showTitle: true,
        onClick: editLink,
      },
      { type: 'separator' },
      {
        type: 'button',
        icon: OpenIcon,
        className: 'hyperlink-open-link',
        title: intl.formatMessage(linkToolbarMessages.openLink),
        onClick: visitCardLink,
      },
      { type: 'separator' },
      generateDeleteButton(node, state, intl),
    ];
  }
};

export const floatingToolbar = (
  state: EditorState,
  intl: IntlShape,
  providerFactory: ProviderFactory,
): FloatingToolbarConfig | undefined => {
  const { inlineCard, blockCard } = state.schema.nodes;
  const nodeType = [inlineCard, blockCard];

  const pluginState: CardPluginState = pluginKey.getState(state);

  return {
    title: 'Card floating controls',
    nodeType,
    items: generateToolbarItems(state, intl, providerFactory),
    ...(pluginState.showLinkingToolbar ? editLinkToolbarConfig : {}),
  };
};
