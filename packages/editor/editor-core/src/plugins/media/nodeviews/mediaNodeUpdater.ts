import { MediaADFAttrs, MediaAttributes } from '@uidu/adf-schema';
import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  MediaProvider,
} from '@uidu/editor-common';
import { getMediaClient } from '@uidu/media-core';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { v4 as uuidV4 } from 'uuid';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import {
  ACTION,
  ACTION_SUBJECT,
  DispatchAnalyticsEvent,
  EVENT_TYPE,
} from '../../analytics';
import {
  replaceExternalMedia,
  updateAllMediaNodesAttrs,
  updateMediaNodeAttrs,
} from '../commands/helpers';
import { MediaOptions } from '../types';

export type RemoteDimensions = { id: string; height: number; width: number };

export interface MediaNodeUpdaterProps {
  view: EditorView;
  node: PMNode; // assumed to be media type node (ie. child of MediaSingle, MediaGroup)
  mediaProvider?: Promise<MediaProvider>;
  isMediaSingle: boolean;
  mediaOptions?: MediaOptions;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}

export class MediaNodeUpdater {
  props: MediaNodeUpdaterProps;

  constructor(props: MediaNodeUpdaterProps) {
    this.props = props;
  }

  isMediaBlobUrl(): boolean {
    const attrs = this.getAttrs();

    return false;
  }

  hasFileAttributesDefined = () => {
    const attrs = this.getAttrs();
    return (
      attrs &&
      attrs.type === 'file' &&
      attrs.__fileName &&
      attrs.__fileMimeType &&
      attrs.__fileSize
    );
  };

  updateFileAttrs = async (isMediaSingle: boolean = true) => {
    // const attrs = this.getAttrs();
    // const mediaProvider = await this.props.mediaProvider;
    // if (
    //   !mediaProvider ||
    //   !mediaProvider.uploadOptions ||
    //   !attrs ||
    //   attrs.type !== 'file' ||
    //   this.hasFileAttributesDefined()
    // ) {
    //   return;
    // }
    // const mediaClientConfig = mediaProvider.viewMediaClientConfig;
    // const mediaClient = getMediaClient(mediaClientConfig);
    // const options = {};
    // const fileState = await mediaClient.file.getCurrentState(attrs.id, options);
    // if (fileState.status === 'error') {
    //   return;
    // }
    // const { name, mimeType, size } = fileState;
    // const newAttrs = {
    //   __fileName: name,
    //   __fileMimeType: mimeType,
    //   __fileSize: size,
    // };
    // const attrsChanged = hasPrivateAttrsChanged(attrs, newAttrs);
    // if (attrsChanged) {
    //   // TODO [MS-2258]: we should pass this.props.isMediaSingle and remove hardcoded "true"
    //   updateAllMediaNodesAttrs(
    //     attrs.id,
    //     newAttrs,
    //     isMediaSingle,
    //   )(this.props.view.state, this.props.view.dispatch);
    // }
  };

  getAttrs = (): MediaADFAttrs | undefined => {
    const { attrs } = this.props.node;
    if (attrs) {
      return attrs as MediaAttributes;
    }

    return undefined;
  };

  uploadExternalMedia = async (getPos: ProsemirrorGetPosHandler) => {
    const { node } = this.props;
    const mediaProvider = await this.props.mediaProvider;

    if (node && mediaProvider) {
      const uploadMediaClientConfig = mediaProvider.uploadMediaClientConfig;
      if (!uploadMediaClientConfig || !node.attrs.url) {
        return;
      }
      const mediaClient = getMediaClient(uploadMediaClientConfig);

      try {
        const uploader = await mediaClient.file.uploadExternal(node.attrs.url);

        const { uploadableFileUpfrontIds, dimensions } = uploader;
        replaceExternalMedia(getPos() + 1, {
          id: uploadableFileUpfrontIds.id,
          height: dimensions.height,
          width: dimensions.width,
          occurrenceKey: uploadableFileUpfrontIds.occurrenceKey,
        })(this.props.view.state, this.props.view.dispatch);
      } catch (e) {
        //keep it as external media
        if (this.props.dispatchAnalyticsEvent) {
          this.props.dispatchAnalyticsEvent({
            action: ACTION.UPLOAD_EXTERNAL_FAIL,
            actionSubject: ACTION_SUBJECT.EDITOR,
            eventType: EVENT_TYPE.OPERATIONAL,
          });
        }
      }
    }
  };

  updateDimensions = (dimensions: RemoteDimensions) => {
    updateAllMediaNodesAttrs(
      dimensions.id,
      {
        height: dimensions.height,
        width: dimensions.width,
      },
      true,
    )(this.props.view.state, this.props.view.dispatch);
  };

  async getRemoteDimensions(): Promise<false | RemoteDimensions> {
    const mediaProvider = await this.props.mediaProvider;
    const { mediaOptions } = this.props;
    const attrs = this.getAttrs();
    if (!mediaProvider || !attrs) {
      return false;
    }
    const { height, width } = attrs;
    if (!attrs.id) {
      return false;
    }
    const { id } = attrs;
    if (height && width) {
      return false;
    }

    // can't fetch remote dimensions on mobile, so we'll default them
    if (mediaOptions && !mediaOptions.allowRemoteDimensionsFetch) {
      return {
        id,
        height: DEFAULT_IMAGE_HEIGHT,
        width: DEFAULT_IMAGE_WIDTH,
      };
    }

    const viewMediaClientConfig = mediaProvider.viewMediaClientConfig;
    const mediaClient = getMediaClient(viewMediaClientConfig);
    const state = await mediaClient.getImageMetadata(id, {});

    if (!state || !state.original) {
      return false;
    }

    return {
      id,
      height: state.original.height || DEFAULT_IMAGE_HEIGHT,
      width: state.original.width || DEFAULT_IMAGE_WIDTH,
    };
  }

  isNodeFromDifferentCollection = async (): Promise<boolean> => {
    const mediaProvider = await this.props.mediaProvider;
    if (!mediaProvider || !mediaProvider.uploadOptions) {
      return false;
    }

    const attrs = this.getAttrs();
    if (!attrs || attrs.type !== 'file') {
      return false;
    }

    return false;
  };

  // Copies the pasted node into the current collection
  copyNode = async () => {
    const mediaProvider = await this.props.mediaProvider;
    const { isMediaSingle, view } = this.props;
    const attrs = this.getAttrs();
    if (
      !mediaProvider ||
      !mediaProvider.uploadOptions ||
      !attrs ||
      attrs.type !== 'file'
    ) {
      return;
    }

    const uploadMediaClientConfig = mediaProvider.uploadMediaClientConfig;

    if (uploadMediaClientConfig && uploadMediaClientConfig.getAuthFromContext) {
      const mediaClient = getMediaClient(uploadMediaClientConfig);
      const auth = await uploadMediaClientConfig.getAuthFromContext();
      const { id } = attrs;
      const source = {
        id,
        authProvider: () => Promise.resolve(auth),
      };
      const destination = {
        authProvider: uploadMediaClientConfig.authProvider,
        occurrenceKey: uuidV4(),
      };
      const mediaFile = await mediaClient.file.copyFile(source, destination);

      updateMediaNodeAttrs(
        source.id,
        {
          id: mediaFile.id,
        },
        isMediaSingle,
      )(view.state, view.dispatch);
    }
  };
}
