import * as React from 'react';
import { ProcessedFileState, Context, FileState } from '@uidu/media-core';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import { constructAuthTokenUrl } from '../utils';
import { Outcome, MediaViewerFeatureFlags } from '../domain';
import {
  AudioPlayer,
  AudioCover,
  Audio,
  DefaultCoverWrapper,
  blanketColor,
  CustomAudioPlayerWrapper,
} from '../styled';
import { createError, MediaViewerError } from '../error';
import { getArtifactUrl } from '@uidu/media-store';
import { BaseState, BaseViewer } from './base-viewer';
import { isIE } from '../utils/isIE';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { getObjectUrlFromFileState } from '../utils/getObjectUrlFromFileState';

export type Props = Readonly<{
  item: FileState;
  context: Context;
  collectionName?: string;
  previewCount: number;
  featureFlags?: MediaViewerFeatureFlags;
  showControls?: () => void;
}>;

export type State = BaseState<string> & {
  coverUrl?: string;
};

const defaultCover = (
  <DefaultCoverWrapper>
    <AudioIcon label="cover" size="xlarge" primaryColor={blanketColor} />
  </DefaultCoverWrapper>
);

const getCoverUrl = (
  item: ProcessedFileState,
  context: Context,
  collectionName?: string,
): Promise<string> =>
  constructAuthTokenUrl(`/file/${item.id}/image`, context, collectionName);

export class AudioViewer extends BaseViewer<string, Props, State> {
  protected get initialState() {
    return {
      content: Outcome.pending<string, MediaViewerError>(),
    };
  }

  private renderCover = () => {
    const { item } = this.props;
    const { coverUrl } = this.state;

    if (coverUrl && item.status !== 'error') {
      return <AudioCover src={coverUrl} alt={item.name} />;
    } else {
      return defaultCover;
    }
  };

  private saveAudioElement = (audioElement?: HTMLElement) => {
    if (!audioElement) {
      return;
    }

    audioElement.setAttribute('controlsList', 'nodownload');
  };

  protected renderSuccessful(src: string) {
    const { showControls, previewCount } = this.props;

    const useCustomAudioPlayer = !isIE();
    const isAutoPlay = previewCount === 0;
    return useCustomAudioPlayer ? (
      <AudioPlayer>
        {this.renderCover()}
        <CustomAudioPlayerWrapper>
          <CustomMediaPlayer
            type="audio"
            isAutoPlay={isAutoPlay}
            src={src}
            isShortcutEnabled={true}
            showControls={showControls}
          />
        </CustomAudioPlayerWrapper>
      </AudioPlayer>
    ) : (
      <AudioPlayer>
        {this.renderCover()}
        <CustomAudioPlayerWrapper>
          <Audio
            autoPlay={isAutoPlay}
            controls
            ref={this.saveAudioElement}
            src={src}
            preload="metadata"
          />
        </CustomAudioPlayerWrapper>
      </AudioPlayer>
    );
  }

  private loadCover = (coverUrl: string) => {
    return new Promise(async (resolve, reject) => {
      const img = new Image();

      img.src = coverUrl;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  private setCoverUrl = async () => {
    const { context, item, collectionName } = this.props;

    if (item.status !== 'processed') {
      return;
    }
    const coverUrl = await getCoverUrl(item, context, collectionName);

    try {
      await this.loadCover(coverUrl);
      this.setState({ coverUrl });
    } catch (e) {}
  };

  protected async init() {
    const { context, item, collectionName } = this.props;

    try {
      let audioUrl: string | undefined;

      if (item.status === 'processed') {
        const artifactUrl = getArtifactUrl(item.artifacts, 'audio.mp3');
        if (!artifactUrl) {
          throw new Error('No audio artifacts found');
        }
        audioUrl = await constructAuthTokenUrl(
          artifactUrl,
          context,
          collectionName,
        );
        if (!audioUrl) {
          throw new Error('No audio artifacts found');
        }
      } else {
        audioUrl = await getObjectUrlFromFileState(item);
        if (!audioUrl) {
          this.setState({
            content: Outcome.pending(),
          });
          return;
        }
      }
      this.setCoverUrl();
      this.setState({
        content: Outcome.successful(audioUrl),
      });
    } catch (err) {
      this.setState({
        content: Outcome.failed(createError('previewFailed', err, item)),
      });
    }
  }
  protected release() {
    const { content } = this.state;
    if (!content.data) {
      return;
    }

    URL.revokeObjectURL(content.data);
  }
}
