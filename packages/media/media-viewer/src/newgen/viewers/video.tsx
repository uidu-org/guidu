import * as React from 'react';
import { Context, ProcessedFileState, FileState } from '@uidu/media-core';
import { getArtifactUrl } from '@uidu/media-store';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { constructAuthTokenUrl } from '../utils';
import { Outcome, MediaViewerFeatureFlags } from '../domain';
import { Video, CustomVideoPlayerWrapper } from '../styled';
import { isIE } from '../utils/isIE';
import { createError, MediaViewerError } from '../error';
import { BaseState, BaseViewer } from './base-viewer';
import { getObjectUrlFromFileState } from '../utils/getObjectUrlFromFileState';

export type Props = Readonly<{
  item: FileState;
  context: Context;
  collectionName?: string;
  featureFlags?: MediaViewerFeatureFlags;
  showControls?: () => void;
  previewCount: number;
}>;

export type State = BaseState<string> & {
  isHDActive: boolean;
  coverUrl?: string;
};

const sdArtifact = 'video_640.mp4';
const hdArtifact = 'video_1280.mp4';
const localStorageKeyName = 'mv_video_player_quality';

export class VideoViewer extends BaseViewer<string, Props, State> {
  protected get initialState() {
    const { item } = this.props;
    const preferredQuality = localStorage.getItem(localStorageKeyName);

    return {
      content: Outcome.pending<string, MediaViewerError>(),
      isHDActive: isHDAvailable(item) && preferredQuality !== 'sd',
    };
  }

  private onHDChange = () => {
    const isHDActive = !this.state.isHDActive;
    const preferredQuality = isHDActive ? 'hd' : 'sd';

    localStorage.setItem(localStorageKeyName, preferredQuality);
    this.setState({ isHDActive });
    this.init(isHDActive);
  };

  protected renderSuccessful(content: string) {
    const { isHDActive } = this.state;
    const { item, showControls, previewCount } = this.props;
    const useCustomVideoPlayer = !isIE();
    const isAutoPlay = previewCount === 0;
    return useCustomVideoPlayer ? (
      <CustomVideoPlayerWrapper>
        <CustomMediaPlayer
          type="video"
          isAutoPlay={isAutoPlay}
          onHDToggleClick={this.onHDChange}
          showControls={showControls}
          src={content}
          isHDActive={isHDActive}
          isHDAvailable={isHDAvailable(item)}
          isShortcutEnabled={true}
        />
      </CustomVideoPlayerWrapper>
    ) : (
      <Video autoPlay={isAutoPlay} controls src={content} />
    );
  }

  protected async init(isHDActive: boolean = this.state.isHDActive) {
    const { context, item, collectionName } = this.props;

    try {
      let contentUrl: string | undefined;
      if (item.status === 'processed') {
        const preferHd = isHDActive && isHDAvailable(item);
        const artifactUrl = getVideoArtifactUrl(item, preferHd);
        if (!artifactUrl) {
          throw new Error(`No video artifacts found`);
        }
        contentUrl = await constructAuthTokenUrl(
          artifactUrl,
          context,
          collectionName,
        );
        if (!contentUrl) {
          throw new Error(`No video artifacts found`);
        }
      } else {
        contentUrl = await getObjectUrlFromFileState(item);

        if (!contentUrl) {
          this.setState({
            content: Outcome.pending(),
          });
          return;
        }
      }

      this.setState({
        content: Outcome.successful(contentUrl),
      });
    } catch (err) {
      this.setState({
        content: Outcome.failed(createError('previewFailed', err, item)),
      });
    }
  }

  protected release() {}
}

function isHDAvailable(file: FileState): boolean {
  if (file.status !== 'processed') {
    return false;
  }
  return !!getArtifactUrl(file.artifacts, hdArtifact);
}

function getVideoArtifactUrl(
  file: ProcessedFileState,
  preferHd?: boolean,
): string | undefined {
  const artifactName = preferHd ? hdArtifact : sdArtifact;
  return getArtifactUrl(file.artifacts, artifactName);
}
