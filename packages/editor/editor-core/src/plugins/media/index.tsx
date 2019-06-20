import { media, mediaGroup, mediaSingle } from '@atlaskit/adf-schema';
import * as React from 'react';
import WithPluginState from '../../components/WithPluginState';
import {
  EditorAppearance,
  EditorPlugin,
  PMPluginFactoryParams,
} from '../../types';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconImages } from '../quick-insert/assets';
import { ReactMediaGroupNode } from './nodeviews/mediaGroup';
import { ReactMediaSingleNode } from './nodeviews/mediaSingle';
import keymapPlugin from './pm-plugins/keymap';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import {
  createPlugin,
  MediaState,
  stateKey as pluginKey,
} from './pm-plugins/main';
import {
  createPlugin as createMediaEditorPlugin,
  pluginKey as mediaEditorPluginKey,
} from './pm-plugins/media-editor';
import { floatingToolbar } from './toolbar';
import { CustomMediaPicker, MediaEditorState, MediaProvider } from './types';
import ClipboardMediaPickerWrapper from './ui/ClipboardMediaPickerWrapper';
import MediaEditor from './ui/MediaEditor';
import ToolbarMedia from './ui/ToolbarMedia';

export { insertMediaSingleNode } from './utils/media-single';
export { MediaState, MediaProvider, CustomMediaPicker };

export interface MediaOptions {
  provider?: Promise<MediaProvider>;
  allowMediaSingle?: boolean | MediaSingleOptions;
  allowMediaGroup?: boolean;
  customDropzoneContainer?: HTMLElement;
  customMediaPicker?: CustomMediaPicker;
  allowResizing?: boolean;
  allowAnnotation?: boolean;
}

export interface MediaSingleOptions {
  disableLayout?: boolean;
}

const mediaPlugin = (
  options?: MediaOptions,
  appearance?: EditorAppearance,
): EditorPlugin => ({
  nodes() {
    return [
      { name: 'mediaGroup', node: mediaGroup },
      { name: 'mediaSingle', node: mediaSingle },
      { name: 'media', node: media },
    ].filter(node => {
      const { allowMediaGroup = true, allowMediaSingle = false } =
        options || {};

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
    return [
      {
        name: 'media',
        plugin: ({
          schema,
          props,
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
                  props.appearance,
                ),
                mediaSingle: ReactMediaSingleNode(
                  portalProviderAPI,
                  eventDispatcher,
                  providerFactory,
                  options,
                  props.appearance,
                  props.appearance === 'full-width',
                ),
              },
              errorReporter,
              uploadErrorHandler: props.uploadErrorHandler,
              waitForMediaUpload: props.waitForMediaUpload,
              customDropzoneContainer:
                options && options.customDropzoneContainer,
              customMediaPicker: options && options.customMediaPicker,
              appearance: props.appearance,
              allowResizing: !!(options && options.allowResizing),
            },
            reactContext,
            dispatch,
            props.appearance,
            dispatchAnalyticsEvent,
          ),
      },
      { name: 'mediaKeymap', plugin: () => keymapPlugin() },
    ].concat(
      options && options.allowMediaSingle
        ? {
            name: 'mediaSingleKeymap',
            plugin: ({ schema, props }) =>
              keymapMediaSinglePlugin(schema, props.appearance),
          }
        : [],
      options && options.allowAnnotation
        ? { name: 'mediaEditor', plugin: createMediaEditorPlugin }
        : [],
    );
  },

  contentComponent({ editorView, eventDispatcher }) {
    // render MediaEditor separately because it doesn't depend on media plugin state
    // so we can utilise EventDispatcher-based rerendering
    const mediaEditor =
      options && options.allowAnnotation ? (
        <WithPluginState
          editorView={editorView}
          plugins={{ mediaEditorState: mediaEditorPluginKey }}
          eventDispatcher={eventDispatcher}
          render={({
            mediaEditorState,
          }: {
            mediaEditorState: MediaEditorState;
          }) => (
            <MediaEditor
              mediaEditorState={mediaEditorState}
              view={editorView}
            />
          )}
        />
      ) : null;

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

        {mediaEditor}
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
          <IconImages label={formatMessage(messages.filesAndImages)} />
        ),
        action(insert, state) {
          const pluginState = pluginKey.getState(state);
          pluginState.showMediaPicker();
          const tr = insert('');
          return addAnalytics(tr, {
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],

    floatingToolbar: (state, intl) =>
      floatingToolbar(
        state,
        intl,
        options && options.allowResizing,
        options && options.allowAnnotation,
        appearance,
      ),
  },
});

export default mediaPlugin;
