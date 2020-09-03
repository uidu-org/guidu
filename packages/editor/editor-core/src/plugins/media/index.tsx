import { media, mediaGroup, mediaSingle } from '@uidu/adf-schema';
import type { MediaProvider } from '@uidu/editor-common';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock/messages';
import { IconImages } from '../quick-insert/assets';
import { ReactMediaGroupNode } from './nodeviews/mediaGroup';
import { ReactMediaSingleNode } from './nodeviews/mediaSingle';
import { createPlugin as createMediaAltTextPlugin } from './pm-plugins/alt-text';
import keymapMediaAltTextPlugin from './pm-plugins/alt-text/keymap';
import keymapPlugin from './pm-plugins/keymap';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import linkingPlugin from './pm-plugins/linking';
import keymapLinkingPlugin from './pm-plugins/linking/keymap';
import type { MediaState } from './pm-plugins/main';
import { createPlugin, stateKey as pluginKey } from './pm-plugins/main';
import { floatingToolbar } from './toolbar';
import type { CustomMediaPicker, MediaOptions } from './types';
import ClipboardMediaPickerWrapper from './ui/ClipboardMediaPickerWrapper';
import ToolbarMedia from './ui/ToolbarMedia';

export { insertMediaSingleNode } from './utils/media-single';
export type { MediaState, MediaProvider, CustomMediaPicker };

const mediaPlugin = (options?: MediaOptions): EditorPlugin => ({
  name: 'media',

  nodes() {
    const { allowMediaGroup = true, allowMediaSingle = false } = options || {};

    return [
      { name: 'mediaGroup', node: mediaGroup },
      { name: 'mediaSingle', node: mediaSingle },
      { name: 'media', node: media },
    ].filter((node) => {
      if (node.name === 'mediaGroup') {
        return allowMediaGroup;
      }

      if (node.name === 'mediaSingle') {
        return allowMediaSingle;
      }

      return true;
    });
  },

  pmPlugins() {
    const pmPlugins = [
      {
        name: 'media',
        plugin: ({
          schema,
          dispatch,
          eventDispatcher,
          providerFactory,
          errorReporter,
          portalProviderAPI,
          reactContext,
          dispatchAnalyticsEvent,
        }: PMPluginFactoryParams) =>
          createPlugin(
            schema,
            {
              providerFactory,
              nodeViews: {
                mediaGroup: ReactMediaGroupNode(
                  portalProviderAPI,
                  providerFactory,
                  options && options.allowLazyLoading,
                  options && options.isCopyPasteEnabled,
                ),
                mediaSingle: ReactMediaSingleNode(
                  portalProviderAPI,
                  eventDispatcher,
                  providerFactory,
                  options,
                  options && options.fullWidthEnabled,
                  dispatchAnalyticsEvent,
                  options && options.isCopyPasteEnabled,
                ),
              },
              errorReporter,
              uploadErrorHandler: options && options.uploadErrorHandler,
              waitForMediaUpload: options && options.waitForMediaUpload,
              customDropzoneContainer:
                options && options.customDropzoneContainer,
              customMediaPicker: options && options.customMediaPicker,
              allowResizing: !!(options && options.allowResizing),
            },
            reactContext,
            dispatch,
            options,
          ),
      },
      { name: 'mediaKeymap', plugin: () => keymapPlugin() },
    ];
    if (options && options.allowMediaSingle) {
      pmPlugins.push({
        name: 'mediaSingleKeymap',
        plugin: ({ schema }) => keymapMediaSinglePlugin(schema),
      });
    }

    // if (options && options.allowAnnotation) {
    //   pmPlugins.push({ name: 'mediaEditor', plugin: createMediaEditorPlugin });
    // }

    if (options && options.allowAltTextOnImages) {
      pmPlugins.push({
        name: 'mediaAltText',
        plugin: createMediaAltTextPlugin,
      });
      pmPlugins.push({
        name: 'mediaAltTextKeymap',
        plugin: ({ schema }) => keymapMediaAltTextPlugin(schema),
      });
    }

    if (options && options.allowLinking) {
      pmPlugins.push({
        name: 'mediaLinking',
        plugin: ({ dispatch }: PMPluginFactoryParams) =>
          linkingPlugin(dispatch),
      });
      pmPlugins.push({
        name: 'mediaLinkingKeymap',
        plugin: ({ schema }) => keymapLinkingPlugin(schema),
      });
    }

    return pmPlugins;
  },

  contentComponent({ editorView, eventDispatcher }) {
    return (
      <>
        <WithPluginState
          editorView={editorView}
          plugins={{
            mediaState: pluginKey,
          }}
          render={({ mediaState }) => (
            <>
              <ClipboardMediaPickerWrapper mediaState={mediaState} />
            </>
          )}
        />
      </>
    );
  },

  secondaryToolbarComponent({ editorView, eventDispatcher, disabled }) {
    return (
      <ToolbarMedia
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        pluginKey={pluginKey}
        isDisabled={disabled}
        isReducedSpacing={true}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.filesAndImages),
        description: formatMessage(messages.filesAndImagesDescription),
        priority: 400,
        keywords: ['media', 'attachment'],
        icon: () => (
          <FormattedMessage {...messages.filesAndImages}>
            {(label: string) => <IconImages label={label} />}
          </FormattedMessage>
        ),
        action(insert, state) {
          const pluginState = pluginKey.getState(state);
          pluginState.showMediaPicker();
          const tr = insert('');
          return addAnalytics(state, tr, {
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],

    floatingToolbar: (state, intl, providerFactory) =>
      floatingToolbar(state, intl, {
        providerFactory,
        allowResizing: options && options.allowResizing,
        allowResizingInTables: options && options.allowResizingInTables,
        allowAnnotation: options && options.allowAnnotation,
        allowLinking: options && options.allowLinking,
        allowAdvancedToolBarOptions:
          options && options.allowAdvancedToolBarOptions,
        allowAltTextOnImages: options && options.allowAltTextOnImages,
        altTextValidator: options && options.altTextValidator,
      }),
  },
});

export default mediaPlugin;
