import { ErrorReporter } from '@uidu/editor-common';
import MediaPicker from '@uidu/media-picker';
import * as React from 'react';
import PickerFacade from '../picker-facade';
import { MediaPluginState, MediaProvider } from '../pm-plugins/main';
import { CustomMediaPicker } from '../types';

type Props = {
  mediaState: MediaPluginState;
};

type State = {
  config?: any;
  context?: any;
  pickerFacadeInstance?: PickerFacade;
};

const dummyMediaPickerObject: CustomMediaPicker = {
  on: () => {},
  removeAllListeners: () => {},
  emit: () => {},
  destroy: () => {},
  setUploadParams: () => {},
};

export default class ClipboardMediaPickerWrapper extends React.Component<
  Props,
  State
> {
  state: State = {};

  private handleMediaProvider = async (
    _name: string,
    provider?: Promise<MediaProvider>,
  ) => {
    const { mediaState } = this.props;
    const mediaProvider = await provider;

    if (!mediaProvider || !mediaProvider.uploadParams) {
      return undefined;
    }

    const context = await mediaProvider.uploadContext;

    if (!context) {
      return undefined;
    }

    const pickerFacadeConfig = {
      context,
      errorReporter: mediaState.options.errorReporter || new ErrorReporter(),
    };

    /**
     * As the first MediaPicker component to be migrated to React, we want to scope the amount of changes logic changed/moved on Editor side.
     * To achieve this we agreed on using `PickerFacade` 'customMediaPicker' type, since we only need this instance to reuse the logic when we subscribe
     * for all the different events in MediaPicker (onPreviewUpdate, onError, onProcessing, etc).
     * The `dummyMediaPickerObject` provided here serves as a workaround for the old picker api that `PickerFacade` will try to use.
     * But we don't want this to do anything since it's all part of the new React component (`Clipboard` component in this case).
     * Eventually PickerFacade will be removed and replaced with a new abstraction explained here https://product-fabric.atlassian.net/browse/MS-1937
     */
    const pickerFacadeInstance = await new PickerFacade(
      'customMediaPicker',
      pickerFacadeConfig,
      dummyMediaPickerObject,
    ).init();

    /**
     * Based on the `initPickers` method in `MediaPluginState` we need these 2 `onNewMedia` subscriptions.
     * First one in order to trigger the entire process of uploading a file for when `onPreviewUpdate` is called
     * Second one in order to track all analytics as before.
     */
    pickerFacadeInstance.onNewMedia(mediaState.insertFile);
    pickerFacadeInstance.onNewMedia(mediaState.trackNewMediaEvent('clipboard'));
    pickerFacadeInstance.setUploadParams(mediaProvider.uploadParams);

    const config = {
      uploadParams: mediaProvider.uploadParams,
    };

    this.setState({
      pickerFacadeInstance,
      config,
      context,
    });
  };

  componentDidMount() {
    this.props.mediaState.options.providerFactory.subscribe(
      'mediaProvider',
      this.handleMediaProvider,
    );
  }

  componentWillUnmount() {
    this.props.mediaState.options.providerFactory.unsubscribe(
      'mediaProvider',
      this.handleMediaProvider,
    );
  }

  render() {
    const { context, config, pickerFacadeInstance } = this.state;

    if (!context || !config || !pickerFacadeInstance) {
      return null;
    }

    return (
      <MediaPicker
        context={context}
        config={config}
        onError={pickerFacadeInstance.handleUploadError}
        onPreviewUpdate={pickerFacadeInstance.handleUploadPreviewUpdate}
        onProcessing={pickerFacadeInstance.handleReady}
      />
    );
  }
}
