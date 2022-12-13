import { MediaState } from '@uidu/editor-core';
import { MediaClientConfig, MediaUploadOptions } from '@uidu/media-core';

export interface FeatureFlags {}

export type MediaProvider = {
  uploadOptions?: MediaUploadOptions;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   * NOTE: We currently don't accept MediaClientConfig, because we need config properties
   *       to initialize
   */
  uploadMediaClientConfig?: MediaClientConfig;

  /**
   * (optional) Media picker props to handle media picker in different contexts
   */
  mediaPickerProps?: (mediaState: MediaState) => void;

  /**
   * Used for displaying Media Cards and downloading files.
   */
  viewMediaClientConfig: MediaClientConfig;
};
