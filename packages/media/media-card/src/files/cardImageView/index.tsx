import * as React from 'react';
import { Component, ReactNode } from 'react';
import { MediaType, ImageResizeMode } from '@uidu/media-core';

import { CardDimensions, CardStatus } from '../../index';
import { CardAction } from '../../actions';

import { CardOverlay } from './cardOverlay';
import {
  PlayIconWrapper,
  Wrapper,
  ProgressBarWrapper,
  Body,
  CardActionsWrapper,
  Overlay,
  ProgressWrapper,
  Title,
} from './styled';
import { isLoadingImage } from '../../utils/isLoadingImage';
import { MediaImage } from '../../utils/mediaImage';
import { CardLoading } from '../../utils/cardLoading';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import { shouldDisplayImageThumbnail } from '../../utils/shouldDisplayImageThumbnail';
import { Ellipsify } from '@uidu/media-ui';
import { ProgressBar } from '../../utils/progressBar';
import CardActions from '../../utils/cardActions';

export interface FileCardImageViewProps {
  readonly mediaName?: string;
  readonly mediaType?: MediaType;
  readonly fileSize?: string;

  readonly dataURI?: string;
  readonly progress?: number;
  readonly status: CardStatus;

  readonly dimensions?: CardDimensions;
  readonly resizeMode?: ImageResizeMode;

  readonly disableOverlay?: boolean;
  readonly selectable?: boolean;
  readonly selected?: boolean;

  readonly error?: ReactNode;

  readonly actions?: CardAction[];
  readonly onRetry?: () => void;
  readonly previewOrientation?: number;
}

export class FileCardImageView extends Component<FileCardImageViewProps, {}> {
  static defaultProps = {
    resizeMode: 'crop',
    disableOverlay: false,
  };

  render() {
    const { disableOverlay, selectable, selected, mediaType } = this.props;
    return (
      <Wrapper
        disableOverlay={disableOverlay}
        selectable={selectable}
        selected={selected}
        mediaType={mediaType}
      >
        {this.renderCardContents()}
      </Wrapper>
    );
  }

  private renderCardContents = (): Array<JSX.Element> | JSX.Element => {
    const { status } = this.props;

    if (status === 'error') {
      return this.renderErrorContents();
    } else if (status === 'failed-processing') {
      return this.renderFailedContents();
    }

    if (this.isImageNotReadyForDisplay) {
      return this.renderLoadingContents();
    }

    return this.renderSuccessCardContents();
  };

  private renderLoadingContents = () => {
    return (
      <div className="wrapper">
        <div className="img-wrapper">
          <CardLoading />
        </div>
      </div>
    );
  };

  private renderErrorContents = (): JSX.Element => {
    const {
      error,
      mediaName,
      mediaType,
      onRetry,
      actions,
      fileSize,
    } = this.props;

    return (
      <>
        <div className="wrapper" />
        <CardOverlay
          persistent={true}
          mediaName={mediaName}
          mediaType={mediaType}
          error={error}
          onRetry={onRetry}
          actions={actions}
          subtitle={fileSize}
        />
      </>
    );
  };

  private renderFailedContents = () => {
    const { mediaName, mediaType, actions, fileSize } = this.props;

    return (
      <>
        <div className="wrapper" />
        <CardOverlay
          noHover={true}
          persistent={true}
          mediaName={mediaName}
          mediaType={mediaType}
          actions={actions}
          subtitle={fileSize}
        />
      </>
    );
  };

  private renderUploadingCardOverlay = (): JSX.Element => {
    const { mediaType, dataURI, selectable, selected } = this.props;
    const isPersistent = mediaType === 'doc' || !dataURI;

    return (
      <CardOverlay
        persistent={isPersistent}
        selectable={selectable}
        selected={selected}
      />
    );
  };

  private renderPlayButton = () => {
    const { mediaType } = this.props;
    if (mediaType !== 'video') {
      return null;
    }

    return (
      <PlayIconWrapper>
        <VidPlayIcon label="play" size="large" />
      </PlayIconWrapper>
    );
  };

  private renderMediaImage = () => {
    const { dataURI, mediaType, previewOrientation } = this.props;
    if (shouldDisplayImageThumbnail(dataURI, mediaType)) {
      return (
        <MediaImage
          dataURI={dataURI}
          crop={this.isCropped}
          stretch={this.isStretched}
          previewOrientation={previewOrientation}
        />
      );
    }
    return null;
  };

  private renderProgressBar = () => {
    const { mediaName, progress, actions, status } = this.props;

    if (status !== 'uploading') {
      return null;
    }

    return (
      <ProgressBarWrapper>
        <Overlay>
          <Title>
            <Ellipsify text={mediaName || ''} lines={2} />
          </Title>
          <Body>
            <ProgressWrapper>
              <ProgressBar progress={progress} />
            </ProgressWrapper>
            <CardActionsWrapper>
              {actions ? (
                <CardActions actions={actions} triggerColor="white" />
              ) : null}
            </CardActionsWrapper>
          </Body>
        </Overlay>
      </ProgressBarWrapper>
    );
  };

  private renderSuccessCardContents = (): JSX.Element => {
    const { disableOverlay, selectable, status } = this.props;

    let overlay: JSX.Element | null = null;
    if (!disableOverlay) {
      if (status === 'uploading') {
        if (selectable) {
          overlay = this.renderUploadingCardOverlay();
        }
      } else {
        overlay = this.renderSuccessCardOverlay();
      }
    }

    return (
      <div className="wrapper">
        <div className="img-wrapper">
          {this.renderMediaImage()}
          {this.renderProgressBar()}
          {this.renderPlayButton()}
        </div>
        {overlay}
      </div>
    );
  };

  private renderSuccessCardOverlay = (): JSX.Element => {
    const {
      mediaName,
      mediaType,
      fileSize,
      dataURI,
      selectable,
      selected,
      actions,
    } = this.props;
    const isPersistent = mediaType === 'doc' || !dataURI;

    return (
      <CardOverlay
        persistent={isPersistent}
        selectable={selectable}
        selected={selected}
        mediaName={mediaName}
        mediaType={mediaType}
        subtitle={fileSize}
        actions={actions}
      />
    );
  };

  private get isImageNotReadyForDisplay() {
    const { status, dataURI, mediaType } = this.props;

    if (dataURI) {
      return false;
    }

    return (
      status === 'loading' ||
      status === 'processing' ||
      isLoadingImage(mediaType, dataURI)
    );
  }

  private get isCropped() {
    const { resizeMode } = this.props;

    return resizeMode === 'crop';
  }

  private get isStretched() {
    const { resizeMode } = this.props;

    return resizeMode === 'stretchy-fit';
  }
}

export default FileCardImageView;
