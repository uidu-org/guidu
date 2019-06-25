import {
  ImageLoaderProps,
  ProviderFactory,
  withImageLoader,
} from '@atlaskit/editor-common';
import { Context, Identifier } from '@atlaskit/media-core';
import Card from '@uidu/media-card';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { Component } from 'react';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import { EditorAppearance } from '../../../types';
import {
  MediaPluginState,
  MediaProvider,
  stateKey as mediaStateKey,
} from '../pm-plugins/main';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

export interface MediaNodeProps extends ReactNodeProps, ImageLoaderProps {
  view: EditorView;
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
  providerFactory?: ProviderFactory;
  cardDimensions: any;
  isMediaSingle?: boolean;
  onClick?: any;
  onExternalImageLoaded?: (dimensions: {
    width: number;
    height: number;
  }) => void;
  editorAppearance: EditorAppearance;
  mediaProvider?: Promise<MediaProvider>;
  viewContext?: Context;
  uploadComplete?: boolean;
}

class MediaNode extends Component<MediaNodeProps> {
  private mediaPluginState: MediaPluginState;

  constructor(props: MediaNodeProps) {
    super(props);
    const { view } = this.props;
    this.mediaPluginState = mediaStateKey.getState(view.state);
  }

  shouldComponentUpdate(nextProps: MediaNodeProps & ImageLoaderProps) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.viewContext !== nextProps.viewContext ||
      this.props.uploadComplete !== nextProps.uploadComplete ||
      this.props.node.attrs.id !== nextProps.node.attrs.id ||
      this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
      this.props.cardDimensions.height !== nextProps.cardDimensions.height ||
      this.props.cardDimensions.width !== nextProps.cardDimensions.width
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.handleNewNode(this.props);
  }

  componentWillUnmount() {
    const { node } = this.props;
    this.mediaPluginState.handleMediaNodeUnmount(node);
  }

  componentDidUpdate(prevProps: Readonly<MediaNodeProps & ImageLoaderProps>) {
    if (prevProps.node.attrs.id !== this.props.node.attrs.id) {
      this.mediaPluginState.handleMediaNodeUnmount(prevProps.node);
      this.handleNewNode(this.props);
    }
    this.mediaPluginState.updateElement();
  }

  render() {
    const {
      node,
      selected,
      cardDimensions,
      onClick,
      editorAppearance,
      viewContext,
      uploadComplete,
    } = this.props;

    const { id, type, collection, url } = node.attrs;
    const isMobile = editorAppearance === 'mobile';

    if (
      type !== 'external' &&
      (!viewContext || (typeof uploadComplete === 'boolean' && !uploadComplete))
    ) {
      return <div>Loading...</div>;
      // return <CardLoading dimensions={cardDimensions} />;
    }

    const identifier: Identifier =
      type === 'external'
        ? {
            dataURI: url!,
            name: url,
            mediaItemType: 'external-image',
          }
        : {
            id,
            mediaItemType: 'file',
            collectionName: collection!,
          };

    return (
      <Card
        // context={viewContext as any}
        // resizeMode="stretchy-fit"
        // dimensions={cardDimensions}
        file={identifier as any}
        // selectable={true}
        // selected={selected}
        // disableOverlay={true}
        onClick={onClick}
        // useInlinePlayer={!isMobile}
        // isLazy={!isMobile}
      />
    );
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { node } = props;

    // +1 indicates the media node inside the mediaSingle nodeview
    this.mediaPluginState.handleMediaNodeMount(
      node,
      () => this.props.getPos() + 1,
    );
  };
}

export default withImageLoader<MediaNodeProps>(MediaNode);
