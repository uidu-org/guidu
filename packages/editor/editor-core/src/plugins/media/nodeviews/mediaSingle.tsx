import {
  ExternalMediaAttributes,
  MediaAttributes,
  MediaSingleLayout,
} from '@atlaskit/adf-schema';
import {
  browser,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  MediaSingle,
  ProviderFactory,
  WithProviders,
} from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { Decoration, EditorView } from 'prosemirror-view';
import * as React from 'react';
import { Component } from 'react';
import { MediaOptions } from '../';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import WithPluginState from '../../../components/WithPluginState';
import { EventDispatcher } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { SelectionBasedNodeView } from '../../../nodeviews/ReactNodeView';
import { createDisplayGrid } from '../../../plugins/grid';
import { EditorAppearance } from '../../../types';
import { setNodeSelection } from '../../../utils';
import { pluginKey as widthPluginKey } from '../../width';
import { updateMediaNodeAttrs } from '../commands';
import { isMobileUploadCompleted } from '../commands/helpers';
import {
  MediaPluginState,
  stateKey as mediaPluginKey,
} from '../pm-plugins/main';
import { MediaProvider } from '../types';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import MediaItem from './media';
export interface MediaSingleNodeProps {
  view: EditorView;
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
  eventDispatcher: EventDispatcher;
  width: number;
  selected: Function;
  lineLength: number;
  editorAppearance: EditorAppearance;
  mediaOptions: MediaOptions;
  mediaProvider?: Promise<MediaProvider>;
  fullWidthMode?: boolean;
  mediaPluginState: MediaPluginState;
}

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
  viewContext?: Context;
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  static defaultProps: Partial<MediaSingleNodeProps> = {
    mediaOptions: {},
  };

  state = {
    width: undefined,
    height: undefined,
    viewContext: undefined,
  };

  async componentDidMount() {
    const mediaProvider = await this.props.mediaProvider;
    if (mediaProvider) {
      const viewContext = await mediaProvider.viewContext;
      this.setState({
        viewContext,
      });
    }
    const updatedDimensions = await this.getRemoteDimensions();
    if (updatedDimensions) {
      updateMediaNodeAttrs(
        updatedDimensions.id,
        {
          height: updatedDimensions.height,
          width: updatedDimensions.width,
        },
        true,
      )(this.props.view.state, this.props.view.dispatch);
    }
  }

  async getRemoteDimensions(): Promise<
    false | { id: string; height: number; width: number }
  > {
    const mediaProvider = await this.props.mediaProvider;
    const { firstChild } = this.props.node;
    if (!mediaProvider || !firstChild) {
      return false;
    }
    const { height, type, width } = firstChild.attrs as
      | MediaAttributes
      | ExternalMediaAttributes;
    if (type === 'external') {
      return false;
    }
    const { id, collection } = firstChild.attrs as MediaAttributes;
    if (height && width) {
      return false;
    }

    // can't fetch remote dimensions on mobile, so we'll default them
    if (this.props.editorAppearance === 'mobile') {
      return {
        id,
        height: DEFAULT_IMAGE_HEIGHT,
        width: DEFAULT_IMAGE_WIDTH,
      };
    }

    const viewContext = await mediaProvider.viewContext;
    const state = await viewContext.getImageMetadata(id, {
      collection,
    });

    if (!state || !state.original) {
      return false;
    }

    return {
      id,
      height: state.original.height || DEFAULT_IMAGE_HEIGHT,
      width: state.original.width || DEFAULT_IMAGE_WIDTH,
    };
  }

  private onExternalImageLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    this.setState(
      {
        width,
        height,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  selectMediaSingle = ({ event }: any) => {
    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
    event.stopPropagation();
    setNodeSelection(this.props.view, this.props.getPos());
  };

  updateSize = (width: number | null, layout: MediaSingleLayout) => {
    const { state, dispatch } = this.props.view;
    const pos = this.props.getPos();
    if (typeof pos === 'undefined') {
      return undefined;
    }
    return dispatch(
      state.tr.setNodeMarkup(pos, undefined, {
        ...this.props.node.attrs,
        layout,
        width,
      }),
    );
  };

  render() {
    const {
      selected,
      getPos,
      node,
      view: { state },
      editorAppearance,
      fullWidthMode,
    } = this.props;

    const { layout, width: mediaSingleWidth } = node.attrs;
    const childNode = node.firstChild!;

    let { width, height, type } = childNode.attrs;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;

      if (width === null) {
        width = stateWidth || DEFAULT_IMAGE_WIDTH;
      }

      if (height === null) {
        height = stateHeight || DEFAULT_IMAGE_HEIGHT;
      }
    }

    let canResize = !!this.props.mediaOptions.allowResizing;

    const pos = getPos();
    if (pos) {
      const $pos = state.doc.resolve(pos);
      const { table } = state.schema.nodes;
      const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [table]);
      canResize = canResize && !disabledNode;
    }

    if (width === null || height === null) {
      width = DEFAULT_IMAGE_WIDTH;
      height = DEFAULT_IMAGE_HEIGHT;
    }

    const cardWidth = this.props.width;
    const cardHeight = (height / width) * cardWidth;
    const cardDimensions = {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
    };

    const props = {
      layout,
      width,
      height,

      containerWidth: this.props.width,
      lineLength: this.props.lineLength,
      pctWidth: mediaSingleWidth,
    };

    const uploadComplete = isMobileUploadCompleted(
      this.props.mediaPluginState,
      childNode.attrs.id,
    );

    const MediaChild = (
      <MediaItem
        view={this.props.view}
        node={childNode}
        getPos={this.props.getPos}
        cardDimensions={cardDimensions}
        viewContext={this.state.viewContext}
        selected={selected()}
        onClick={this.selectMediaSingle}
        onExternalImageLoaded={this.onExternalImageLoaded}
        editorAppearance={editorAppearance}
        uploadComplete={uploadComplete}
        url={childNode.attrs.url}
      />
    );

    return canResize ? (
      <ResizableMediaSingle
        {...props}
        view={this.props.view}
        getPos={getPos}
        fullWidthMode={fullWidthMode}
        updateSize={this.updateSize}
        displayGrid={createDisplayGrid(this.props.eventDispatcher)}
        gridSize={12}
        viewContext={this.state.viewContext}
        state={this.props.view.state}
        appearance={this.props.editorAppearance}
        selected={this.props.selected()}
      >
        {MediaChild}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...props}>{MediaChild}</MediaSingle>
    );
  }
}

class MediaSingleNodeView extends SelectionBasedNodeView {
  lastOffsetLeft = 0;
  forceViewUpdate = false;

  createDomRef(): HTMLElement {
    const domRef = document.createElement('div');
    if (
      browser.chrome &&
      this.reactComponentProps.editorAppearance !== 'mobile'
    ) {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true';
    }
    return domRef;
  }

  viewShouldUpdate(nextNode: PMNode) {
    if (this.forceViewUpdate) {
      this.forceViewUpdate = false;
      return true;
    }

    if (this.node.attrs !== nextNode.attrs) {
      return true;
    }

    return super.viewShouldUpdate(nextNode);
  }

  getNodeMediaId(node: PMNode): string | undefined {
    if (node.firstChild) {
      return node.firstChild.attrs.id;
    }
    return undefined;
  }

  update(
    node: PMNode,
    decorations: Decoration[],
    isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean,
  ) {
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode);
    }
    return super.update(node, decorations, isValidUpdate);
  }

  render() {
    const {
      eventDispatcher,
      editorAppearance,
      fullWidthMode,
      providerFactory,
      mediaOptions,
    } = this.reactComponentProps;

    return (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider }) => {
          return (
            <WithPluginState
              editorView={this.view}
              plugins={{
                width: widthPluginKey,
                mediaPluginState: mediaPluginKey,
              }}
              render={({ width, mediaPluginState }) => {
                const { selection } = this.view.state;
                const isSelected = () =>
                  this.isSelectionInsideNode(selection.from, selection.to) ||
                  (selection instanceof NodeSelection &&
                    selection.from === this.getPos());

                return (
                  <MediaSingleNode
                    width={width.width}
                    lineLength={width.lineLength}
                    node={this.node}
                    getPos={this.getPos}
                    mediaProvider={mediaProvider}
                    mediaOptions={mediaOptions || {}}
                    view={this.view}
                    fullWidthMode={fullWidthMode}
                    selected={isSelected}
                    eventDispatcher={eventDispatcher}
                    editorAppearance={editorAppearance}
                    mediaPluginState={mediaPluginState}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }

  ignoreMutation() {
    // DOM has changed; recalculate if we need to re-render
    if (this.dom) {
      const offsetLeft = this.dom.offsetLeft;

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft;
        this.forceViewUpdate = true;

        this.update(this.node, [], () => true);
      }
    }

    return true;
  }
}

export const ReactMediaSingleNode = (
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  providerFactory: ProviderFactory,
  mediaOptions: MediaOptions = {},
  editorAppearance?: EditorAppearance,
  fullWidthMode?: boolean,
) => (node: PMNode, view: EditorView, getPos: () => number) => {
  return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
    eventDispatcher,
    editorAppearance,
    fullWidthMode,
    providerFactory,
    mediaOptions,
  }).init();
};
