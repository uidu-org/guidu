import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Subscription } from 'rxjs/Subscription';
import { Context, UploadableFile, FileIdentifier } from '@uidu/media-core';
import { messages, Shortcut } from '@uidu/media-ui';
import Spinner from '@uidu/spinner';
import { intlShape, IntlProvider } from 'react-intl';
import EditorView from './editorView/editorView';
import { Blanket, SpinnerWrapper } from './styled';
import { fileToBase64 } from '../util';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ErrorView from './editorView/errorView/errorView';

export interface SmartMediaEditorProps {
  identifier: FileIdentifier;
  context: Context;
  onUploadStart: (identifier: FileIdentifier) => void;
  onFinish: () => void;
}

export interface SmartMediaEditorState {
  hasError: boolean;
  errorMessage?: any;
  imageUrl?: string;
}

export class SmartMediaEditor extends React.Component<
  SmartMediaEditorProps & InjectedIntlProps,
  SmartMediaEditorState
> {
  fileName?: string;
  state: SmartMediaEditorState = {
    hasError: false,
  };
  getFileSubscription?: Subscription;
  uploadFileSubscription?: Subscription;

  static contextTypes = {
    intl: intlShape,
  };

  componentDidMount() {
    const { identifier } = this.props;
    this.getFile(identifier);
  }

  componentWillReceiveProps(nextProps: Readonly<SmartMediaEditorProps>) {
    const { identifier, context } = this.props;
    if (
      nextProps.identifier.id !== identifier.id ||
      nextProps.context !== context
    ) {
      this.getFile(nextProps.identifier);
    }
  }

  componentWillUnmount() {
    const { getFileSubscription, uploadFileSubscription } = this;
    if (getFileSubscription) {
      getFileSubscription.unsubscribe();
    }
    if (uploadFileSubscription) {
      uploadFileSubscription.unsubscribe();
    }
  }

  getFile = async (identifier: FileIdentifier) => {
    const { context } = this.props;
    const { collectionName, occurrenceKey } = identifier;
    const id = await identifier.id;
    const getFileSubscription = context.file
      .getFileState(id, { collectionName, occurrenceKey })
      .subscribe({
        next: async state => {
          if (state.status === 'processed') {
            const { name } = state;
            this.fileName = name;
            this.setImageUrl(identifier);
            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          } else if (state.status === 'error') {
            this.onError(state.message);
            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          } else if (state.preview) {
            const { value } = await state.preview;
            if (value instanceof Blob) {
              const base64ImageUrl = await fileToBase64(value);
              this.setState({
                imageUrl: base64ImageUrl,
              });
            } else {
              this.setState({
                imageUrl: value,
              });
            }

            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          }
        },
        error: error => {
          this.onError(error);
        },
      });
    this.getFileSubscription = getFileSubscription;
  };

  setImageUrl = async (identifier: FileIdentifier) => {
    const { context } = this.props;
    const id = await identifier.id;
    const imageUrl = await context.getImageUrl(id, {
      collection: identifier.collectionName,
      mode: 'full-fit',
    });
    this.setState({
      imageUrl,
    });
  };

  private onSave = (imageData: string) => {
    const { fileName } = this;
    const {
      context,
      identifier,
      onUploadStart,
      onFinish,
      intl: { formatMessage },
    } = this.props;

    const { collectionName, occurrenceKey } = identifier;
    const uploadableFile: UploadableFile = {
      content: imageData,
      collection: collectionName,
      name: fileName,
    };
    const id = uuid();
    const touchedFiles = context.file.touchFiles(
      [
        {
          fileId: id,
          collection: collectionName,
        },
      ],
      collectionName,
    );
    const deferredUploadId = touchedFiles.then(
      touchedFiles => touchedFiles.created[0].uploadId,
    );
    const uploadableFileUpfrontIds = {
      id,
      deferredUploadId,
      occurrenceKey,
    };

    const uploadingFileState = context.file.upload(
      uploadableFile,
      undefined,
      uploadableFileUpfrontIds,
    );
    const uploadingFileStateSubscription = uploadingFileState.subscribe({
      next: fileState => {
        if (fileState.status === 'processing') {
          onFinish();
          setTimeout(() => uploadingFileStateSubscription.unsubscribe(), 0);
        } else if (
          fileState.status === 'failed-processing' ||
          fileState.status === 'error'
        ) {
          this.onError(formatMessage(messages.could_not_save_image));
          setTimeout(() => uploadingFileStateSubscription.unsubscribe(), 0);
        }
      },
    });
    const newFileIdentifier: FileIdentifier = {
      id,
      collectionName,
      mediaItemType: 'file',
    };
    onUploadStart(newFileIdentifier);
  };

  onCancel = () => {
    const { onFinish } = this.props;
    onFinish();
  };

  onError = (error: any) => {
    this.setState({
      hasError: true,
      errorMessage: error,
    });
  };

  renderLoading = () => {
    return (
      <SpinnerWrapper>
        <Spinner size="large" invertColor={true} />
      </SpinnerWrapper>
    );
  };

  renderEditor = (imageUrl: string) => {
    return (
      <EditorView
        imageUrl={imageUrl}
        onSave={this.onSave}
        onCancel={this.onCancel}
        onError={this.onError}
      />
    );
  };

  renderError = (error: any) => {
    const { onFinish } = this.props;
    if (error instanceof Error) {
      error = error.message;
    }
    return <ErrorView message={error} onCancel={onFinish} />;
  };

  render() {
    const { imageUrl, hasError, errorMessage } = this.state;

    const content = hasError
      ? this.renderError(errorMessage)
      : imageUrl
      ? this.renderEditor(imageUrl)
      : this.renderLoading();

    return (
      <Blanket>
        <Shortcut keyCode={27} handler={this.onCancel} />
        {content}
      </Blanket>
    );
  }
}

export default class extends React.Component<SmartMediaEditorProps> {
  render() {
    const Component = injectIntl(SmartMediaEditor);
    const content = <Component {...this.props} />;
    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  }
}
