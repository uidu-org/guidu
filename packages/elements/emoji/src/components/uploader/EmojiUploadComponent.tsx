import { AnalyticsEventPayload, CreateUIAnalyticsEvent } from '@uidu/analytics';
import classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';
import { EmojiUpload } from '../../types';
import {
  createAndFireEventInElementsChannel,
  selectedFileEvent,
  uploadCancelButton,
  uploadConfirmButton,
} from '../../util/analytics';
import EmojiUploadPicker from '../common/EmojiUploadPicker';
import { uploadEmoji } from '../common/UploadEmoji';
import * as styles from './styles';

export interface UploadRefHandler {
  (ref: HTMLDivElement): void;
}

export interface Props {
  emojiProvider: EmojiProvider;
  onUploaderRef?: UploadRefHandler;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

export interface State {
  uploadErrorMessage?: MessageDescriptor;
}

export default class EmojiUploadComponent extends PureComponent<Props, State> {
  private ref?: EmojiUploadPicker | null;

  constructor(props: Props) {
    super(props);
    if (supportsUploadFeature(props.emojiProvider)) {
      props.emojiProvider.prepareForUpload();
    }

    this.state = {};
  }

  private onUploadEmoji = (upload: EmojiUpload, retry: boolean) => {
    const { emojiProvider } = this.props;
    this.fireAnalytics(uploadConfirmButton({ retry }));
    const errorSetter = (message?: MessageDescriptor) => {
      this.setState({
        uploadErrorMessage: message,
      });
    };
    uploadEmoji(
      upload,
      emojiProvider,
      errorSetter,
      this.prepareForUpload,
      this.fireAnalytics,
    );
  };

  private prepareForUpload = () => {
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.setState({
      uploadErrorMessage: undefined,
    });

    if (this.ref) {
      this.ref.clearUploadPicker();
    }
  };

  onFileChooserClicked = () => {
    this.fireAnalytics(selectedFileEvent());
  };

  private onUploadCancelled = () => {
    this.fireAnalytics(uploadCancelButton());
    this.prepareForUpload();
  };

  private onUploaderRef = (emojiUploadPicker: EmojiUploadPicker | null) => {
    this.ref = emojiUploadPicker;
  };

  private fireAnalytics = (analyticsEvent: AnalyticsEventPayload) => {
    const { createAnalyticsEvent } = this.props;

    if (createAnalyticsEvent) {
      createAndFireEventInElementsChannel(analyticsEvent)(createAnalyticsEvent);
    }
  };

  render() {
    const { uploadErrorMessage } = this.state;

    const errorMessage = uploadErrorMessage ? (
      <FormattedMessage {...uploadErrorMessage} />
    ) : null;

    return (
      <div
        className={classNames([styles.emojiUploadWidget])}
        ref={this.props.onUploaderRef}
      >
        <div className={classNames([styles.emojiUploadFooter])}>
          <EmojiUploadPicker
            ref={this.onUploaderRef}
            onFileChooserClicked={this.onFileChooserClicked}
            onUploadCancelled={this.onUploadCancelled}
            onUploadEmoji={this.onUploadEmoji}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    );
  }
}
