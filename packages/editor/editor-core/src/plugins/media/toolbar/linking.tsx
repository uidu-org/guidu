import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import OpenIcon from '@atlaskit/icon/glyph/shortcut';
import { isSafeUrl } from '@uidu/adf-schema';
import { ProviderFactory } from '@uidu/editor-common';
import { EditorState } from 'prosemirror-state';
import React from 'react';
import { IntlShape } from 'react-intl';
import { linkMessages, linkToolbarMessages } from '../../../messages';
import { Command } from '../../../types';
import {
  RECENT_SEARCH_HEIGHT_IN_PX,
  RECENT_SEARCH_WIDTH_IN_PX,
} from '../../../ui/RecentSearch/ToolbarComponents';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../../floating-toolbar/types';
import {
  hideLinkingToolbar,
  setUrlToMedia,
  showLinkingToolbar,
  unlink,
} from '../commands/linking';
import { getMediaLinkingState, MediaLinkingState } from '../pm-plugins/linking';
import { MediaToolbarBaseConfig } from '../types';
import MediaLinkingToolbar from '../ui/MediaLinkingToolbar';

export function shouldShowMediaLinkToolbar(editorState: EditorState): boolean {
  const mediaLinkingState = getMediaLinkingState(editorState);
  if (!mediaLinkingState || mediaLinkingState.mediaPos === null) {
    return false;
  }
  const {
    nodes: { mediaSingle },
    marks: { link },
  } = editorState.schema;
  const node = editorState.doc.nodeAt(mediaLinkingState.mediaPos);

  if (!node || node.type !== mediaSingle) {
    return false;
  }

  const { parent } = editorState.doc.resolve(mediaLinkingState.mediaPos);

  return parent && parent.type.allowsMarkType(link);
}

export const buildLinkingButtons = (
  state: EditorState,
  intl: IntlShape,
): Array<FloatingToolbarItem<Command>> => {
  const mediaLinkingState = getMediaLinkingState(state);
  const isValidUrl = isSafeUrl(mediaLinkingState.link);
  let title;

  if (mediaLinkingState.editable) {
    title = intl.formatMessage(linkToolbarMessages.editLink);

    return [
      {
        type: 'button',
        onClick: showLinkingToolbar,
        selected: false,
        title,
        showTitle: true,
        // tooltipContent: renderTooltipContent(title, addLink),
      },
      { type: 'separator' },
      {
        type: 'button',
        target: '_blank',
        href: isValidUrl ? mediaLinkingState.link : undefined,
        disabled: !isValidUrl,
        onClick: (state, dispatch) => {
          // Track if is visited
          if (dispatch) {
            dispatch(state.tr);
          }
          return true;
        },
        selected: false,
        title: intl.formatMessage(
          isValidUrl
            ? linkMessages.openLink
            : linkToolbarMessages.unableToOpenLink,
        ),
        icon: OpenIcon,
        className: 'hyperlink-open-link',
      },
    ];
  }

  title = intl.formatMessage(linkToolbarMessages.addLink);

  return [
    {
      type: 'button',
      icon: LinkIcon,
      title,
      onClick: showLinkingToolbar,
      // tooltipContent: renderTooltipContent(title, addLink),
    },
  ];
};

export const getLinkingToolbar = (
  toolbarBaseConfig: MediaToolbarBaseConfig,
  mediaLinkingState: MediaLinkingState,
  state: EditorState,
  intl: IntlShape,
  providerFactory?: ProviderFactory,
): FloatingToolbarConfig | undefined => {
  const { link, visible, editable: editing, mediaPos } = mediaLinkingState;

  if (visible && mediaPos !== null) {
    const node = state.doc.nodeAt(mediaPos);
    if (node) {
      return {
        ...toolbarBaseConfig,
        height: RECENT_SEARCH_HEIGHT_IN_PX,
        width: RECENT_SEARCH_WIDTH_IN_PX,
        forcePlacement: true,
        items: [
          {
            type: 'custom',
            render: (view, idx) => {
              if (!view || !providerFactory) {
                return null;
              }
              return (
                <MediaLinkingToolbar
                  key={idx}
                  displayUrl={link}
                  providerFactory={providerFactory}
                  intl={intl}
                  editing={editing}
                  onUnlink={() => unlink(view.state, view.dispatch, view)}
                  onBack={(href, meta) => {
                    if (href.trim() && meta.inputMethod) {
                      setUrlToMedia(href)(view.state, view.dispatch, view);
                    }
                    hideLinkingToolbar(view.state, view.dispatch, view);
                  }}
                  onCancel={() =>
                    hideLinkingToolbar(view.state, view.dispatch, view)
                  }
                  onSubmit={(href, meta) => {
                    setUrlToMedia(href)(view.state, view.dispatch, view);
                    hideLinkingToolbar(view.state, view.dispatch, view);
                  }}
                  onBlur={() => {
                    hideLinkingToolbar(view.state, view.dispatch, view);
                  }}
                />
              );
            },
          },
        ],
      };
    }
  }
  return undefined;
};
