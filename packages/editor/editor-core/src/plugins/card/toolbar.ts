import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import OpenIcon from '@atlaskit/icon/glyph/open';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { removeSelectedNode } from 'prosemirror-utils';
import { defineMessages, InjectedIntl } from 'react-intl';
import { FloatingToolbarConfig } from '../../../src/plugins/floating-toolbar/types';
import { Command } from '../../../src/types';
import { analyticsService } from '../../analytics';
import commonMessages from '../../messages';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, addAnalytics, AnalyticsEventPayload, EVENT_TYPE, INPUT_METHOD } from '../analytics';
import { hoverDecoration } from '../base/pm-plugins/decoration';



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

  const { attrs, type } = state.selection.node;
  const data = attrs.data || {};
  const url = attrs.url || data.url;

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

// Temporarily disabled after https://product-fabric.atlassian.net/browse/MS-1308
/*
const changeAppearance = (selectedOption: SelectOption) => {
  if (selectedOption.value === 'link') {
    return changeSelectedCardToLink;
  } else {
    return setSelectedCardAppearance(selectedOption.value as CardAppearance);
  }
};

const buildDropdown = (
  state: EditorState,
  intl: InjectedIntl,
): FloatingToolbarItem<Command> => {
  const { selection } = state;
  const selectedNode = selection instanceof NodeSelection && selection.node;
  const options: SelectOption[] = [];
  const { inlineCard, blockCard } = state.schema.nodes;

  if (selectedNode && [inlineCard, blockCard].indexOf(selectedNode.type) > -1) {
    const currentAppearance = appearanceForNodeType(selectedNode.type);

    ['block', 'inline', 'link'].forEach(value => {
      // don't allow conversion to link if it has no url attached
      if (value === 'link' && !selectedNode.attrs.url) {
        return undefined;
      }

      if (value === 'block') {
        // don't allow conversion if the parent node doesn't allow it
        const { $from } = selection;
        const containerDepth =
          currentAppearance === 'block' ? $from.depth : $from.depth - 1;

        const allowed = $from
          .node(containerDepth)
          .type.validContent(
            Fragment.from(
              blockCard.createChecked(
                selectedNode.attrs,
                undefined,
                selectedNode.marks,
              ),
            ),
          );

        if (!allowed) {
          return undefined;
        }
      }

      options.push({
        value,
        label: intl.formatMessage(messages[value]),
        selected: currentAppearance === value,
      });
    });
  }

  return {
    type: 'select',
    options,
    defaultValue: options.find(option => !!option.selected),
    onChange: changeAppearance,
  };
}; */

export const floatingToolbar = (
  state: EditorState,
  intl: InjectedIntl,
): FloatingToolbarConfig | undefined => {
  const { inlineCard, blockCard } = state.schema.nodes;
  const nodeType = [inlineCard, blockCard];

  return {
    title: 'Card floating controls',
    nodeType,
    items: [
      // Temporarily disabled after https://product-fabric.atlassian.net/browse/MS-1308
      // buildDropdown(state, intl),
      // { type: 'separator' },
      {
        type: 'button',
        icon: OpenIcon,
        title: intl.formatMessage(commonMessages.visit),
        onClick: visitCardLink,
      },
      { type: 'separator' },
      {
        type: 'button',
        appearance: 'danger',
        icon: RemoveIcon,
        onMouseEnter: hoverDecoration(nodeType, true),
        onMouseLeave: hoverDecoration(nodeType, false),
        title: intl.formatMessage(commonMessages.remove),
        onClick: removeCard,
      },
    ],
  };
};
