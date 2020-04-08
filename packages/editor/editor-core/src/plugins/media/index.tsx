import { media, mediaGroup, mediaSingle } from '@uidu/adf-schema';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  EditorAppearance,
  EditorPlugin,
  PMPluginFactoryParams,
} from '../../types';
import WithPluginState from '../../ui/WithPluginState';
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
import { floatingToolbar } from './toolbar';
import { CustomMediaPicker, MediaProvider } from './types';
import ClipboardMediaPickerWrapper from './ui/ClipboardMediaPickerWrapper';
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
  name: 'media',

  nodes() {
    return [
      { name: 'mediaGroup', node: mediaGroup },
      { name: 'mediaSingle', node: mediaSingle },
      { name: 'media', node: media },
    ].filter((node) => {
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
    );
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
          console.log(pluginState);
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
