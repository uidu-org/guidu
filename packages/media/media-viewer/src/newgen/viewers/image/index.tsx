import * as React from 'react';
import { Context, FileItem, FileState } from '@uidu/media-core';
import { getOrientation } from '@uidu/media-ui';
import { Outcome } from '../../domain';
import { createError, MediaViewerError } from '../../error';
import { InteractiveImg } from './interactive-img';
import { AnalyticViewerProps } from '../../analytics/item-viewer';
import { BaseViewer } from '../base-viewer';

export type ObjectUrl = string;
export const REQUEST_CANCELLED = 'request_cancelled';

export type ImageViewerProps = AnalyticViewerProps & {
  context: Context;
  item: FileState;
  collectionName?: string;
  onClose?: () => void;
};

export interface ImageViewerContent {
  objectUrl: ObjectUrl;
  orientation?: number;
}

function processedFileStateToMediaItem(file: FileState): FileItem {
  return {
    type: 'file',
    details: {
      id: file.id,
    },
  };
}

export class ImageViewer extends BaseViewer<
  ImageViewerContent,
  ImageViewerProps
> {
  protected get initialState() {
    return { content: Outcome.pending<ImageViewerContent, MediaViewerError>() };
  }

  private cancelImageFetch?: () => void;

  // This method is spied on by some test cases, so don't rename or remove it.
  public preventRaceCondition() {
    // Calling setState might introduce a race condition, because the app has
    // already transitioned to a different state. To avoid this we're not doing
    // anything.
  }

  protected async init() {
    const { item: file, context, collectionName } = this.props;
    if (file.status === 'error') {
      return;
    }

    try {
      let orientation = 1;
      let objectUrl: string;
      if (file.status === 'processed') {
        const item = processedFileStateToMediaItem(file);
        const controller =
          typeof AbortController !== 'undefined'
            ? new AbortController()
            : undefined;
        const response = context.getImage(
          item.details.id,
          {
            width: 1920,
            height: 1080,
            mode: 'fit',
            allowAnimated: true,
            collection: collectionName,
          },
          controller,
        );
        this.cancelImageFetch = () => controller && controller.abort();
        objectUrl = URL.createObjectURL(await response);
      } else {
        const { preview } = file;
        if (preview) {
          const { value } = await preview;
          if (value instanceof Blob) {
            orientation = await getOrientation(value as File);
            objectUrl = URL.createObjectURL(value);
          } else {
            objectUrl = value;
          }
        } else {
          this.setState({
            content: Outcome.pending(),
          });
          return;
        }
      }

      this.setState({
        content: Outcome.successful({ objectUrl, orientation }),
      });
    } catch (err) {
      if (err.message === REQUEST_CANCELLED) {
        this.preventRaceCondition();
      } else {
        this.setState({
          content: Outcome.failed(createError('previewFailed', err, file)),
        });
        this.props.onLoad({ status: 'error', errorMessage: err.message });
      }
    }
  }

  protected release() {
    if (this.cancelImageFetch) {
      this.cancelImageFetch();
    }

    this.state.content.whenSuccessful(({ objectUrl }) => {
      this.revokeObjectUrl(objectUrl);
    });
  }

  // This method is spied on by some test cases, so don't rename or remove it.
  public revokeObjectUrl(objectUrl: string) {
    URL.revokeObjectURL(objectUrl);
  }

  protected renderSuccessful(content: ImageViewerContent) {
    const { onClose } = this.props;
    return (
      <InteractiveImg
        onLoad={this.onLoad}
        onError={this.onError}
        src={content.objectUrl}
        orientation={content.orientation}
        onClose={onClose}
      />
    );
  }

  private onLoad = () => {
    this.props.onLoad({ status: 'success' });
  };

  private onError = () => {
    this.props.onLoad({
      status: 'error',
      errorMessage: 'Interactive-img render failed',
    });
  };
}
