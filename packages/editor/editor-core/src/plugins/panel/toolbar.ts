import ErrorIcon from '@atlaskit/icon/glyph/editor/error';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import { defineMessages } from 'react-intl';
import commonMessages from '../../messages';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import { changePanelType, removePanel } from './actions';
import { getPluginState } from './pm-plugins/main';

export const messages = defineMessages({
  info: {
    id: 'uidu.editor-core.info',
    defaultMessage: 'Info',
    description:
      'Panels provide a way to highlight text. The info panel has a blue background.',
  },
  note: {
    id: 'uidu.editor-core.note',
    defaultMessage: 'Note',
    description:
      'Panels provide a way to highlight text. The note panel has a purple background.',
  },
  success: {
    id: 'uidu.editor-core.success',
    defaultMessage: 'Success',
    description:
      'Panels provide a way to highlight text. The success panel has a green background.',
  },
  warning: {
    id: 'uidu.editor-core.warning',
    defaultMessage: 'Warning',
    description:
      'Panels provide a way to highlight text. The warning panel has a yellow background.',
  },
  error: {
    id: 'uidu.editor-core.error',
    defaultMessage: 'Error',
    description:
      'Panels provide a way to highlight text. The error panel has a red background.',
  },
});

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
) => {
  const panelState = getPluginState(state);
  if (panelState && panelState.toolbarVisible && panelState.element) {
    const { activePanelType } = panelState;
    const nodeType = state.schema.nodes.panel;
    return {
      title: 'Panel floating controls',
      getDomRef: () => panelState.element,
      nodeType,
      items: [
        {
          type: 'button',
          icon: InfoIcon,
          onClick: changePanelType('info'),
          selected: activePanelType === 'info',
          title: formatMessage(messages.info),
        },
        {
          type: 'button',
          icon: NoteIcon,
          onClick: changePanelType('note'),
          selected: activePanelType === 'note',
          title: formatMessage(messages.note),
        },
        {
          type: 'button',
          icon: SuccessIcon,
          onClick: changePanelType('success'),
          selected: activePanelType === 'success',
          title: formatMessage(messages.success),
        },
        {
          type: 'button',
          icon: WarningIcon,
          onClick: changePanelType('warning'),
          selected: activePanelType === 'warning',
          title: formatMessage(messages.warning),
        },
        {
          type: 'button',
          icon: ErrorIcon,
          onClick: changePanelType('error'),
          selected: activePanelType === 'error',
          title: formatMessage(messages.error),
        },
        {
          type: 'separator',
        },
        {
          type: 'button',
          appearance: 'danger',
          icon: RemoveIcon,
          onClick: removePanel(),
          onMouseEnter: hoverDecoration(nodeType, true),
          onMouseLeave: hoverDecoration(nodeType, false),
          title: formatMessage(commonMessages.remove),
        },
      ],
    };
  }
  return undefined;
};
