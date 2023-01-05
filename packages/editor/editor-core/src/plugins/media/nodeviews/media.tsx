import {
  ContextIdentifierProvider,
  ImageLoaderProps,
  withImageLoader,
} from '@uidu/editor-common';
import Card from '@uidu/media-card';
import { FileIdentifier } from '@uidu/media-core';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { Component } from 'react';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import { stateKey as mediaStateKey } from '../pm-plugins/plugin-key';
import { MediaPluginState } from '../pm-plugins/types';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

export interface MediaNodeProps extends ReactNodeProps, ImageLoaderProps {
  view: EditorView;
  node: PMNode;
  file: FileIdentifier;
  getPos: ProsemirrorGetPosHandler;
  contextIdentifierProvider?: ContextIdentifierProvider;
  cardDimensions: any;
  originalDimensions?: any;
  onClick?: any;
  onExternalImageLoaded?: (dimensions: {
    width: number;
    height: number;
  }) => void;
  allowLazyLoading?: boolean;
  viewMediaClientConfig?: any;
  uploadComplete?: boolean;
  isLoading?: boolean;
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
      this.props.viewMediaClientConfig !== nextProps.viewMediaClientConfig ||
      this.props.uploadComplete !== nextProps.uploadComplete ||
      this.props.node.attrs.id !== nextProps.node.attrs.id ||
      this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
      this.props.cardDimensions.height !== nextProps.cardDimensions.height ||
      this.props.cardDimensions.width !== nextProps.cardDimensions.width ||
      this.props.contextIdentifierProvider !==
        nextProps.contextIdentifierProvider ||
      this.props.isLoading !== nextProps.isLoading
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
      allowLazyLoading,
      viewMediaClientConfig,
      uploadComplete,
      contextIdentifierProvider,
      originalDimensions,
      isLoading,
      file,
    } = this.props;

    const { id, type, url } = node.attrs;

    if (
      (type !== 'external' &&
        (!viewMediaClientConfig ||
          (typeof uploadComplete === 'boolean' && !uploadComplete))) ||
      !file
    ) {
      return <div>Loading...</div>;
      // return <CardLoading dimensions={cardDimensions} />;
    }

    return (
      <Card
        // context={viewContext as any}
        // resizeMode="stretchy-fit"
        cardDimensions={cardDimensions}
        file={file}
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
    const { getPos } = this.props;

    // +1 indicates the media node inside the mediaSingle nodeview
    this.mediaPluginState.handleMediaNodeMount(node, () => getPos() + 1);
  };
}

export default withImageLoader<MediaNodeProps>(MediaNode);
