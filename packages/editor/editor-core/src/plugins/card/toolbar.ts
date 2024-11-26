import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { isSafeUrl } from '@uidu/adf-schema';
import { ProviderFactory } from '@uidu/editor-common';
import { Node } from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { removeSelectedNode } from 'prosemirror-utils';
import { defineMessages, IntlShape } from 'react-intl';
import commonMessages, {
  linkMessages,
  linkToolbarMessages,
} from '../../messages';
import { Command } from '../../types';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../floating-toolbar/types';
import {
  changeSelectedCardToText,
  setSelectedCardAppearance,
} from './pm-plugins/doc';
import { pluginKey } from './pm-plugins/main';
import { CardOptions, CardPluginState } from './types';
import {
  buildEditLinkToolbar,
  editLink,
  editLinkToolbarConfig,
} from './ui/EditLinkToolbar';
import {
  appearanceForNodeType,
  displayInfoForCard,
  findCardInfo,
  titleUrlPairFromNode,
} from './utils';

export const messages = defineMessages({
  block: {
    id: 'uidu.editor-core.displayBlock',
    defaultMessage: 'Display as card',
    description:
      'Display link as a card with a rich preview similar to in a Facebook feed with page title, description, and potentially an image.',
  },
  inline: {
    id: 'uidu.editor-core.displayInline',
    defaultMessage: 'Display inline',
    description: 'Display link with the title only.',
  },
  embed: {
    id: 'uidu.editor-core.displayEmbed',
    defaultMessage: 'Display as embed',
    description: 'Display link as an embedded object',
  },
  link: {
    id: 'uidu.editor-core.displayLink',
    defaultMessage: 'Display as text',
    description: 'Convert the card to become a regular text-based hyperlink.',
  },
  card: {
    id: 'uidu.editor-core.cardFloatingControls',
    defaultMessage: 'Card options',
    description: 'Options to change card type',
  },
});

export const removeCard: Command = (state, dispatch) => {
  if (!(state.selection instanceof NodeSelection)) {
    return false;
  }
  if (dispatch) {
    dispatch(state, removeSelectedNode(state.tr));
  }
  return true;
};

export const visitCardLink: Command = (state, dispatch) => {
  if (!(state.selection instanceof NodeSelection)) {
    return false;
  }

  const { url } = titleUrlPairFromNode(state.selection.node);

  // We are in edit mode here, open the smart card URL in a new window.
  window.open(url);

  if (dispatch) {
    dispatch(state.tr);
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

const generateToolbarItems =
  (
    state: EditorState,
    intl: IntlShape,
    providerFactory: ProviderFactory,
    cardOptions: CardOptions,
  ) =>
  (node: Node): Array<FloatingToolbarItem<Command>> => {
    const { url } = titleUrlPairFromNode(node);
    if (url && !isSafeUrl(url)) {
      return [];
    }

    const pluginState: CardPluginState = pluginKey.getState(state);

    const currentAppearance = appearanceForNodeType(node.type);

    if (pluginState.showLinkingToolbar) {
      return [
        buildEditLinkToolbar({
          providerFactory,
          node,
        }),
      ];
    } else {
      const toolbarItems: Array<FloatingToolbarItem<Command>> = [
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
          title: intl.formatMessage(linkMessages.openLink),
          onClick: visitCardLink,
        },
        { type: 'separator' },
        generateDeleteButton(node, state, intl),
      ];

      if (cardOptions.allowBlockCards && currentAppearance) {
        const options = [
          {
            title: intl.formatMessage(messages.block),
            onClick: setSelectedCardAppearance('block'),
            selected: currentAppearance === 'block',
            hidden: false,
          },
          {
            title: intl.formatMessage(messages.inline),
            onClick: setSelectedCardAppearance('inline'),
            selected: currentAppearance === 'inline',
            hidden: false,
          },
        ];

        toolbarItems.unshift({
          type: 'dropdown',
          options,
          hidden: false,
          title: intl.formatMessage(messages[currentAppearance]),
        });
      }

      return toolbarItems;
    }
  };

export const floatingToolbar = (cardOptions: CardOptions) => {
  return (
    state: EditorState,
    intl: IntlShape,
    providerFactory: ProviderFactory,
  ): FloatingToolbarConfig | undefined => {
    const { inlineCard, blockCard } = state.schema.nodes;
    const nodeType = [inlineCard, blockCard];

    const pluginState: CardPluginState = pluginKey.getState(state);

    return {
      title: intl.formatMessage(messages.card),
      nodeType,
      items: generateToolbarItems(state, intl, providerFactory, cardOptions),
      ...(pluginState.showLinkingToolbar ? editLinkToolbarConfig : {}),
    };
  };
};
