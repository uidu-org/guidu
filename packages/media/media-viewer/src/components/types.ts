import { Context, Identifier } from '@uidu/media-core';
import { MediaViewerFeatureFlags } from '../newgen/domain';

export interface MediaViewerDataSource {
  list?: Array<Identifier>;
  collectionName?: string;
}

export interface MediaViewerProps {
  readonly context: Context;

  readonly selectedItem: Identifier;
  readonly dataSource: MediaViewerDataSource;

  readonly collectionName: string;
  readonly pageSize?: number;

  readonly onClose?: () => void;

  readonly featureFlags?: MediaViewerFeatureFlags;
}
