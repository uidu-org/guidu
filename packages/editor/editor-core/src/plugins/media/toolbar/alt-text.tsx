import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { IntlShape } from 'react-intl';
import { Command } from '../../../types';
import {
  FloatingToolbarButton,
  FloatingToolbarConfig,
  FloatingToolbarCustom,
} from '../../floating-toolbar/types';
import { openMediaAltTextMenu } from '../pm-plugins/alt-text/commands';
import { messages } from '../pm-plugins/alt-text/messages';
import { ClassNames } from '../pm-plugins/alt-text/style';
import AltTextEdit, {
  CONTAINER_WIDTH_IN_PX,
} from '../pm-plugins/alt-text/ui/AltTextEdit';
import { MediaToolbarBaseConfig } from '../types';
import { getMediaNodeFromSelection } from '../utils/media-common';

export const altTextButton = (
  intl: IntlShape,
  state: EditorState,
): FloatingToolbarButton<Command> => {
  const mediaNode = getMediaNodeFromSelection(state);
  const message =
    mediaNode && mediaNode.attrs.alt ? messages.editAltText : messages.altText;
  const title = intl.formatMessage(message);
  return {
    title,
    type: 'button',
    onClick: openMediaAltTextMenu,
    showTitle: true,
    // tooltipContent: renderTooltipContent(title, addAltText),
  };
};

export const altTextEditComponent = (
  options?: AltTextToolbarOptions,
): FloatingToolbarCustom => {
  return {
    type: 'custom',
    render: (view?: EditorView, idx?: number) => {
      if (!view) {
        return null;
      }

      const mediaNode = getMediaNodeFromSelection(view.state);

      if (!mediaNode) {
        return null;
      }

      return (
        <AltTextEdit
          view={view}
          key={idx}
          value={mediaNode.attrs.alt}
          altTextValidator={options && options.altTextValidator}
        />
      );
    },
  };
};

export interface AltTextToolbarOptions {
  altTextValidator?: (value: string) => string[];
}

export const getAltTextToolbar = (
  toolbarBaseConfig: MediaToolbarBaseConfig,
  options?: AltTextToolbarOptions,
): FloatingToolbarConfig => {
  return {
    ...toolbarBaseConfig,
    width: CONTAINER_WIDTH_IN_PX,
    className: ClassNames.FLOATING_TOOLBAR_COMPONENT,
    items: [altTextEditComponent(options)],
  };
};
