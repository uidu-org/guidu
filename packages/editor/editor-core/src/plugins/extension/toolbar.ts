import EditIcon from '@atlaskit/icon/glyph/editor/edit';
import CenterIcon from '@atlaskit/icon/glyph/editor/media-center';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { defineMessages, IntlShape } from 'react-intl';
import commonMessages from '../../messages';
import { Command } from '../../types';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import {
  FloatingToolbarHandler,
  FloatingToolbarItem,
} from '../floating-toolbar/types';
import { MacroState } from '../macro';
import { pluginKey as macroPluginKey } from '../macro/plugin-key';
import { editExtension } from './actions';
import { removeExtension, updateExtensionLayout } from './commands';
import { getPluginState } from './plugin';
import { ExtensionState } from './types';

export const messages = defineMessages({
  edit: {
    id: 'uidu.editor-core.edit',
    defaultMessage: 'Edit',
    description: 'Edit the properties for this extension.',
  },
});

const isLayoutSupported = (
  state: EditorState,
  selectedExtNode: { pos: number; node: PMNode },
) => {
  const {
    schema: {
      nodes: { bodiedExtension, extension, layoutSection, table, expand },
    },
    selection,
  } = state;

  if (!selectedExtNode) {
    return false;
  }

  return !!(
    (selectedExtNode.node.type === bodiedExtension ||
      (selectedExtNode.node.type === extension &&
        !hasParentNodeOfType([bodiedExtension, table, expand].filter(Boolean))(
          selection,
        ))) &&
    !hasParentNodeOfType([layoutSection])(selection)
  );
};

const breakoutOptions = (
  state: EditorState,
  formatMessage: IntlShape['formatMessage'],
  extensionState: ExtensionState,
  breakoutEnabled: boolean,
): Array<FloatingToolbarItem<Command>> => {
  const { layout, nodeWithPos } = extensionState;
  return nodeWithPos && breakoutEnabled && isLayoutSupported(state, nodeWithPos)
    ? [
        {
          type: 'button',
          icon: CenterIcon,
          onClick: updateExtensionLayout('default'),
          selected: layout === 'default',
          title: formatMessage(commonMessages.layoutFixedWidth),
        },
        {
          type: 'button',
          icon: WideIcon,
          onClick: updateExtensionLayout('wide'),
          selected: layout === 'wide',
          title: formatMessage(commonMessages.layoutWide),
        },
        {
          type: 'button',
          icon: FullWidthIcon,
          onClick: updateExtensionLayout('full-width'),
          selected: layout === 'full-width',
          title: formatMessage(commonMessages.layoutFullWidth),
        },
      ]
    : [];
};

const editButton = (
  formatMessage: IntlShape['formatMessage'],
  extensionState: ExtensionState,
  allowNewConfigPanel: boolean,
): Array<FloatingToolbarItem<Command>> => {
  if (!extensionState.showEditButton) {
    return [];
  }

  return [
    {
      type: 'button',
      icon: EditIcon,
      // Taking the latest `updateExtension` from plugin state to avoid race condition @see ED-8501
      onClick: (state, dispatch) => {
        const macroState: MacroState = macroPluginKey.getState(state);
        return editExtension(
          macroState && macroState.macroProvider,
          allowNewConfigPanel,
          getPluginState(state).updateExtension,
        )(state, dispatch);
      },
      title: formatMessage(messages.edit),
    },
  ];
};

export const getToolbarConfig =
  (
    breakoutEnabled: boolean = true,
    allowNewConfigPanel: boolean = false,
  ): FloatingToolbarHandler =>
  (state, { formatMessage }) => {
    const extensionState = getPluginState(state);

    if (
      extensionState &&
      !extensionState.showContextPanel &&
      extensionState.element
    ) {
      const nodeType = [
        state.schema.nodes.extension,
        state.schema.nodes.inlineExtension,
        state.schema.nodes.bodiedExtension,
      ];

      const editButtonArray = editButton(
        formatMessage,
        extensionState,
        allowNewConfigPanel,
      );
      const breakoutButtonArray = breakoutOptions(
        state,
        formatMessage,
        extensionState,
        breakoutEnabled,
      );

      return {
        title: 'Extension floating controls',
        getDomRef: () => extensionState.element!.parentElement || undefined,
        nodeType,
        items: [
          ...editButtonArray,
          ...breakoutButtonArray,
          {
            type: 'separator',
            hidden:
              editButtonArray.length === 0 && breakoutButtonArray.length === 0,
          },
          {
            type: 'button',
            icon: RemoveIcon,
            appearance: 'danger',
            onClick: removeExtension(),
            onMouseEnter: hoverDecoration(nodeType, true),
            onMouseLeave: hoverDecoration(nodeType, false),
            title: formatMessage(commonMessages.remove),
          },
        ],
      };
    }
    return undefined;
  };
