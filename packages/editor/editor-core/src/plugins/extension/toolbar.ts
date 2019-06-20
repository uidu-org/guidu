import EditIcon from '@atlaskit/icon/glyph/editor/edit';
import CenterIcon from '@atlaskit/icon/glyph/editor/media-center';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { defineMessages, InjectedIntl } from 'react-intl';
import commonMessages from '../../messages';
import { Command } from '../../types';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import { FloatingToolbarHandler, FloatingToolbarItem } from '../floating-toolbar/types';
import { MacroState, pluginKey as macroPluginKey } from '../macro';
import { editExtension, removeExtension, updateExtensionLayout } from './actions';
import { ExtensionState, pluginKey } from './plugin';



export const messages = defineMessages({
  edit: {
    id: 'fabric.editor.edit',
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
      nodes: { bodiedExtension, extension, layoutSection, table },
    },
    selection,
  } = state;

  if (!selectedExtNode) {
    return false;
  }

  return !!(
    (selectedExtNode.node.type === bodiedExtension ||
      (selectedExtNode.node.type === extension &&
        !hasParentNodeOfType([bodiedExtension, table])(selection))) &&
    !hasParentNodeOfType([layoutSection])(selection)
  );
};

const breakoutOptions = (
  state: EditorState,
  formatMessage: InjectedIntl['formatMessage'],
  extensionState: ExtensionState,
): Array<FloatingToolbarItem<Command>> => {
  const { layout, allowBreakout, node } = extensionState;
  return allowBreakout && isLayoutSupported(state, node)
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

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
) => {
  const extensionState: ExtensionState = pluginKey.getState(state);
  const macroState: MacroState = macroPluginKey.getState(state);
  if (extensionState && extensionState.element) {
    const nodeType = [
      state.schema.nodes.extension,
      state.schema.nodes.inlineExtension,
      state.schema.nodes.bodiedExtension,
    ];

    return {
      title: 'Extension floating controls',
      getDomRef: () => extensionState.element!.parentElement || undefined,
      nodeType,
      items: [
        {
          type: 'button',
          icon: EditIcon,
          onClick: editExtension(macroState && macroState.macroProvider),
          title: formatMessage(messages.edit),
        },
        ...breakoutOptions(state, formatMessage, extensionState),
        {
          type: 'separator',
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
