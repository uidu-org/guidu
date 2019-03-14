import * as React from 'react';
import { Component } from 'react';
import { MediaViewer as MediaViewerNextGen } from '../newgen/media-viewer';
import { ItemSource } from '../newgen/domain';
import { MediaViewerProps } from './types';

export interface MediaViewerState {}

export class MediaViewer extends Component<MediaViewerProps, MediaViewerState> {
  render(): JSX.Element {
    const {
      featureFlags,
      onClose,
      context,
      selectedItem,
      collectionName,
      dataSource,
      pageSize,
    } = this.props;

    const defaultPageSize = 30;

    if (dataSource.list) {
      const items = dataSource.list.map(i => ({
        ...i,
        collectionName,
      }));
      const itemSource: ItemSource = {
        kind: 'ARRAY',
        items: items,
      };
      const identifier = {
        ...selectedItem,
        collectionName,
      };
      return (
        <MediaViewerNextGen
          context={context}
          selectedItem={identifier}
          onClose={onClose}
          itemSource={itemSource}
          featureFlags={featureFlags}
        />
      );
    } else if (dataSource.collectionName) {
      const itemSource: ItemSource = {
        kind: 'COLLECTION',
        collectionName: dataSource.collectionName,
        pageSize: pageSize || defaultPageSize,
      };
      const identifier = {
        ...selectedItem,
        collectionName: dataSource.collectionName,
      };
      return (
        <MediaViewerNextGen
          context={context}
          selectedItem={identifier}
          onClose={onClose}
          itemSource={itemSource}
          featureFlags={featureFlags}
        />
      );
    } else {
      throw new Error();
    }
  }
}
