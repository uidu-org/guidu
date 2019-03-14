import * as React from 'react';
import { ReactNode } from 'react';
import {
  Context,
  FileState,
  MediaType,
  ProcessedFileState,
  ProcessingFileState,
  FileIdentifier,
} from '@uidu/media-core';
import { Subscription } from 'rxjs/Subscription';
import * as deepEqual from 'deep-equal';
import { messages, toHumanReadableMediaSize } from '@uidu/media-ui';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Outcome } from './domain';
import {
  Header as HeaderWrapper,
  LeftHeader,
  RightHeader,
  MetadataWrapper,
  MetadataSubText,
  MedatadataTextWrapper,
  MetadataIconWrapper,
  MetadataFileName,
  hideControlsClassName,
} from './styled';
import { MediaTypeIcon } from './media-type-icon';
import { MediaViewerError, createError } from './error';
import {
  ToolbarDownloadButton,
  DisabledToolbarDownloadButton,
} from './download';

export type Props = {
  readonly identifier: FileIdentifier;
  readonly context: Context;
  readonly onClose?: () => void;
};

export type State = {
  item: Outcome<FileState, MediaViewerError>;
};

const initialState: State = {
  item: Outcome.pending(),
};

export class Header extends React.Component<Props & InjectedIntlProps, State> {
  state: State = initialState;

  private subscription?: Subscription;

  componentWillUpdate(nextProps: Props) {
    if (this.needsReset(this.props, nextProps)) {
      this.release();
      this.init(nextProps);
    }
  }

  componentDidMount() {
    this.init(this.props);
  }

  componentWillUnmount() {
    this.release();
  }

  private init(props: Props) {
    this.setState(initialState, async () => {
      const { context, identifier } = props;
      const id =
        typeof identifier.id === 'string' ? identifier.id : await identifier.id;
      this.subscription = context.file
        .getFileState(id, {
          collectionName: identifier.collectionName,
        })
        .subscribe({
          next: file => {
            this.setState({
              item: Outcome.successful(file),
            });
          },
          error: err => {
            this.setState({
              item: Outcome.failed(createError('metadataFailed', err)),
            });
          },
        });
    });
  }

  private renderDownload = () => {
    const { item } = this.state;
    const { identifier, context } = this.props;
    return item.match({
      pending: () => DisabledToolbarDownloadButton,
      failed: () => DisabledToolbarDownloadButton,
      successful: item => (
        <ToolbarDownloadButton
          state={item}
          identifier={identifier}
          context={context}
        />
      ),
    });
  };

  render() {
    return (
      <HeaderWrapper className={hideControlsClassName}>
        <LeftHeader>{this.renderMetadata()}</LeftHeader>
        <RightHeader>{this.renderDownload()}</RightHeader>
      </HeaderWrapper>
    );
  }

  private renderMetadata() {
    const { item } = this.state;
    return item.match({
      successful: item => this.renderMetadataLayout(item),
      pending: () => null,
      failed: () => null,
    });
  }

  private renderMetadataLayout(item: FileState) {
    if (item.status === 'processed' || item.status === 'processing') {
      return (
        <MetadataWrapper>
          <MetadataIconWrapper>
            {this.getMediaIcon(item.mediaType)}
          </MetadataIconWrapper>
          <MedatadataTextWrapper>
            <MetadataFileName>
              {item.name || <FormattedMessage {...messages.unknown} />}
            </MetadataFileName>
            <MetadataSubText>
              {this.renderFileTypeText(item.mediaType)}
              {this.renderSize(item)}
            </MetadataSubText>
          </MedatadataTextWrapper>
        </MetadataWrapper>
      );
    } else {
      return null;
    }
  }

  private renderSize = (item: ProcessedFileState | ProcessingFileState) => {
    if (item.size) {
      return this.renderSeparator() + toHumanReadableMediaSize(item.size);
    } else {
      return '';
    }
  };

  private renderSeparator = () => {
    return ' · ';
  };

  private renderFileTypeText = (mediaType?: MediaType): ReactNode => {
    const mediaTypeTranslationMap = {
      doc: messages.document,
      audio: messages.audio,
      video: messages.video,
      image: messages.image,
      unknown: messages.unknown,
    };
    const message = mediaTypeTranslationMap[mediaType || 'unknown'];

    // Defaulting to unknown again since backend has more mediaTypes than the current supported ones
    return <FormattedMessage {...message || messages.unknown} />;
  };

  private getMediaIcon = (mediaType?: MediaType) => {
    return <MediaTypeIcon type={mediaType} />;
  };

  private needsReset(propsA: Props, propsB: Props) {
    return (
      !deepEqual(propsA.identifier, propsB.identifier) ||
      propsA.context !== propsB.context
    );
  }

  private release() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export default injectIntl(Header);
