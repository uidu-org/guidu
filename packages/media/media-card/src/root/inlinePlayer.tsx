import * as React from 'react';
import { Component } from 'react';
import { Context, FileIdentifier } from '@uidu/media-core';
import { Subscription } from 'rxjs/Subscription';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { InlinePlayerWrapper } from './styled';
import { CardDimensions, defaultImageCardDimensions } from '..';
import { CardLoading } from '../utils/cardLoading';

export interface InlinePlayerProps {
  identifier: FileIdentifier;
  context: Context;
  dimensions: CardDimensions;
  selected?: boolean;
  onError?: (error: Error) => void;
  onClick?: () => void;
}

export interface InlinePlayerState {
  fileSrc?: string;
}

export class InlinePlayer extends Component<
  InlinePlayerProps,
  InlinePlayerState
> {
  subscription?: Subscription;
  state: InlinePlayerState = {};

  static defaultProps = {
    dimensions: defaultImageCardDimensions,
  };

  async componentDidMount() {
    const { context, identifier } = this.props;
    const { id, collectionName } = identifier;

    this.revoke();
    this.unsubscribe();
    this.subscription = context.file
      .getFileState(await id, { collectionName })
      .subscribe({
        next: async state => {
          if (state.status !== 'error' && state.preview) {
            const { value } = await state.preview;

            if (value instanceof Blob && value.type.indexOf('video/') === 0) {
              const fileSrc = URL.createObjectURL(value);
              this.setState({ fileSrc });
              window.setTimeout(this.unsubscribe, 0);
              return;
            }
          }

          if (state.status === 'processed') {
            const { artifacts } = state;

            try {
              const preferedArtifact = artifacts['video_1280.mp4']
                ? 'video_1280.mp4'
                : 'video_640.mp4';
              const fileSrc = await context.file.getArtifactURL(
                artifacts,
                preferedArtifact,
                collectionName,
              );

              this.setState({ fileSrc });
              window.setTimeout(this.unsubscribe, 0);
            } catch (error) {
              const { onError } = this.props;

              if (onError) {
                onError(error);
              }
            }
          }
        },
      });
  }

  unsubscribe = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  revoke = () => {
    const { fileSrc } = this.state;
    if (fileSrc) {
      URL.revokeObjectURL(fileSrc);
    }
  };

  componentWillUnmount() {
    this.unsubscribe();
    this.revoke();
  }

  private getStyle = (): React.CSSProperties => {
    const { dimensions } = this.props;
    // We are given dimensions. But we can’t just blindly apply them as width and height.
    // Because editor is giving us “maximum” dimensions (equal to what it can go to if resized to 100%
    // of available width). And the same time we don’t want to ignore these dimensions completely,
    // because if consumer do not constraint width/height of container we still want to stick to given dimensions.
    // Here we put width as a style. In combination with max-width: 100%; and max-height: 100%;
    // it would give us required effect.
    return {
      width: dimensions.width,
    };
  };

  render() {
    const { onClick, dimensions, selected } = this.props;
    const { fileSrc } = this.state;

    if (!fileSrc) {
      return <CardLoading dimensions={dimensions} />;
    }

    return (
      <InlinePlayerWrapper
        style={this.getStyle()}
        selected={selected}
        onClick={onClick}
      >
        <CustomMediaPlayer
          type="video"
          src={fileSrc}
          isAutoPlay
          isHDAvailable={false}
        />
      </InlinePlayerWrapper>
    );
  }
}
