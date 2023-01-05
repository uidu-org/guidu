import { MediaADFAttrs, MediaSingleLayout } from '@uidu/adf-schema';
import {
  browser,
  ContextIdentifierProvider,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  MediaSingle,
  ProviderFactory,
  WithProviders,
} from '@uidu/editor-common';
import { FileIdentifier, MediaClientConfig } from '@uidu/media-core';
import { Node as PMNode } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import React, { useCallback, useEffect, useState } from 'react';
import { EventDispatcher } from '../../../event-dispatcher';
import {
  getPosHandler,
  getPosHandlerNode,
  SelectionBasedNodeView,
} from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import { setNodeSelection, setTextSelection } from '../../../utils';
import { DispatchAnalyticsEvent } from '../../analytics';
import { createDisplayGrid } from '../../grid';
import { pluginKey as widthPluginKey } from '../../width';
import { isMobileUploadCompleted } from '../commands/helpers';
import { stateKey as mediaPluginKey } from '../pm-plugins/main';
import { MediaOptions } from '../types';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { floatingLayouts } from '../utils/media-single';
import MediaItem from './media';
import { MediaNodeUpdater } from './mediaNodeUpdater';
import { MediaSingleNodeProps, MediaSingleNodeViewProps } from './types';

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
  viewMediaClientConfig?: MediaClientConfig;
  contextIdentifierProvider?: ContextIdentifierProvider;
  isCopying: boolean;
}

export default function MediaSingleNode(props: MediaSingleNodeProps) {
  const {
    selected,
    getPos,
    node,
    mediaOptions,
    mediaProvider,
    fullWidthMode,
    view: { state },
    view,
    mediaPluginState,
    dispatchAnalyticsEvent,
  } = props;
  // static defaultProps: Partial<MediaSingleNodeProps> = {
  //   mediaOptions: {},
  // };
  // static displayName = 'MediaSingleNode';

  // state: MediaSingleNodeState = {
  //   width: undefined,
  //   height: undefined,
  //   viewMediaClientConfig: undefined,
  //   isCopying: false,
  // };

  const [viewMediaClientConfig, setViewMediaClientConfig] =
    useState<MediaClientConfig>(undefined);
  const [contextIdentifierProvider, setContextIdentifierProvider] =
    useState<ContextIdentifierProvider>(undefined);
  const [file, setFile] = useState<FileIdentifier>(null);
  const [size, setSize] = useState({ width: undefined, height: undefined });

  const createMediaNodeUpdater = useCallback<() => MediaNodeUpdater>(
    () =>
      new MediaNodeUpdater({
        ...props,
        isMediaSingle: true,
        node: node || node.firstChild,
        dispatchAnalyticsEvent,
      }),
    [node, props, dispatchAnalyticsEvent],
  );

  // const UNSAFE_componentWillReceiveProps(nextProps: MediaSingleNodeProps) {
  //   if (nextProps.mediaProvider !== this.props.mediaProvider) {
  //     this.setViewMediaClientConfig(nextProps);
  //   }

  //   // Forced updates not required on mobile
  //   if (nextProps.isCopyPasteEnabled === false) {
  //     return;
  //   }

  //   // We need to call this method on any prop change since attrs can get removed with collab editing
  //   // the method internally checks if we already have all attrs
  //   this.createMediaNodeUpdater(nextProps).updateFileAttrs();
  // }

  const updateMediaNodeAttributes = useCallback(async () => {
    const mediaNodeUpdater = createMediaNodeUpdater();
    // const { addPendingTask } = mediaPluginState;

    // we want the first child of MediaSingle (type "media")
    // const node = node.firstChild;
    if (!node?.firstChild) {
      return;
    }
    const updatedDimensions = await mediaNodeUpdater.getRemoteDimensions();
    if (updatedDimensions) {
      mediaNodeUpdater.updateDimensions(updatedDimensions);
    }
  }, [createMediaNodeUpdater, node?.firstChild]);

  useEffect(() => {
    async function onMount() {
      const resolvedMediaProvider = await mediaProvider;
      if (resolvedMediaProvider) {
        const { viewMediaClientConfig: viewMediaClientConfigFromProps } =
          resolvedMediaProvider;
        setViewMediaClientConfig(() => viewMediaClientConfigFromProps);

        viewMediaClientConfigFromProps(node.firstChild.attrs)
          .then(setFile)
          .catch(console.error);
      }
    }
    onMount()
      .then(() => console.log('mounted'))
      .catch(console.error);
  }, [mediaProvider, node.firstChild.attrs]);

  const onExternalImageLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    setSize({ width, height });
  };

  const selectMediaSingle = (event: React.MouseEvent) => {
    event.persist();
    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
    event.stopPropagation();

    const propPos = getPos();

    if (event.shiftKey) {
      // don't select text if there is current selection in a table (as this would override selected cells)
      if (state.selection instanceof CellSelection) {
        return;
      }

      setTextSelection(
        view,
        state.selection.from < propPos ? state.selection.from : propPos,
        // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
        state.selection.to > propPos ? state.selection.to : propPos + 3,
      );
    } else {
      setNodeSelection(view, propPos);
    }
  };

  const updateSize = (width: number | null, layout: MediaSingleLayout) => {
    const {
      node: { attrs },
      view: { dispatch },
    } = props;
    const pos = getPos();
    if (typeof pos === 'undefined') {
      return undefined;
    }
    const tr = state.tr.setNodeMarkup(pos, undefined, {
      ...attrs,
      layout,
      width,
    });
    tr.setMeta('scrollIntoView', false);
    return dispatch(tr);
  };

  const isCopying = false;

  const { layout, width: mediaSingleWidth } = node.attrs;
  const childNode = node.firstChild;
  let {
    file: {
      metadata: { width, height },
    },
  } = childNode.attrs as MediaADFAttrs;

  if (!width || !height) {
    width = DEFAULT_IMAGE_WIDTH;
    height = DEFAULT_IMAGE_HEIGHT;
  }
  const cardWidth = width;
  const cardHeight = (height / width) * cardWidth;

  const cardDimensions = {
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
  };

  const mediaSingleProps = {
    layout,
    width,
    height,
    containerWidth: width,
    lineLength: props.lineLength,
    pctWidth: mediaSingleWidth,
    fullWidthMode,
  };

  console.log('file', file);

  const isSelected: boolean = selected();

  const uploadComplete = isMobileUploadCompleted(
    mediaPluginState,
    childNode.attrs.id,
  );
  const originalDimensions = {
    width,
    height,
  };
  const MediaChild = (
    <MediaItem
      view={view}
      node={childNode}
      file={file}
      getPos={getPos}
      cardDimensions={cardDimensions}
      originalDimensions={originalDimensions}
      viewMediaClientConfig={viewMediaClientConfig}
      selected={isSelected}
      onClick={selectMediaSingle}
      onExternalImageLoaded={onExternalImageLoaded}
      allowLazyLoading={mediaOptions && mediaOptions.allowLazyLoading}
      uploadComplete={uploadComplete}
      url={childNode.attrs.url}
      contextIdentifierProvider={contextIdentifierProvider}
      isLoading={isCopying}
    />
  );

  let canResize = !!props.mediaOptions.allowResizing;

  if (!props.mediaOptions.allowResizingInTables) {
    // If resizing not allowed in tables, check parents for tables
    const pos = getPos();
    if (pos) {
      const $pos = state.doc.resolve(pos);
      const { table } = state.schema.nodes;
      const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [table]);
      canResize = canResize && !disabledNode;
    }
  }

  return canResize ? (
    <ResizableMediaSingle
      {...mediaSingleProps}
      lineLength={
        fullWidthMode
          ? props.lineLength
          : getLineLength(view, getPos()) || props.lineLength
      }
      view={view}
      getPos={getPos}
      updateSize={updateSize}
      displayGrid={createDisplayGrid(props.eventDispatcher)}
      gridSize={12}
      viewMediaClientConfig={viewMediaClientConfig}
      state={state}
      // allowBreakoutSnapPoints={
      //   mediaOptions && mediaOptions.allowBreakoutSnapPoints
      // }
      selected={isSelected}
    >
      {MediaChild}
    </ResizableMediaSingle>
  ) : (
    <MediaSingle {...mediaSingleProps}>{MediaChild}</MediaSingle>
  );
}

const getLineLength = (view: EditorView, pos: number): number | null => {
  if (typeof pos !== 'number' || Number.isNaN(pos) || !view) {
    return null;
  }

  const { expand, nestedExpand, layoutColumn } = view.state.schema.nodes;
  const $pos = view.state.doc.resolve(pos);
  const isInsideOfBlockNode = !!findParentNodeOfTypeClosestToPos($pos, [
    expand,
    nestedExpand,
    layoutColumn,
  ]);

  if (isInsideOfBlockNode) {
    const domNode = view.nodeDOM($pos.pos);

    if (
      $pos.nodeAfter &&
      floatingLayouts.indexOf($pos.nodeAfter.attrs.layout) > -1 &&
      domNode &&
      domNode.parentElement
    ) {
      return domNode.parentElement.offsetWidth;
    }

    if (domNode instanceof HTMLElement) {
      return domNode.offsetWidth;
    }
  }

  return null;
};

class MediaSingleNodeView extends SelectionBasedNodeView<MediaSingleNodeViewProps> {
  lastOffsetLeft = 0;

  forceViewUpdate = false;

  createDomRef(): HTMLElement {
    const domRef = document.createElement('div');
    if (
      browser.chrome &&
      this.reactComponentProps.mediaOptions &&
      this.reactComponentProps.mediaOptions.allowMediaSingleEditable
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
    innerDecorations: DecorationSet,
    isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean,
  ) {
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode);
    }
    return super.update(node, decorations, innerDecorations, isValidUpdate);
  }

  render() {
    const {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent,
    } = this.reactComponentProps;

    // getPos is a boolean for marks, since this is a node we know it must be a function
    const getPos = this.getPos as getPosHandlerNode;

    return (
      <WithProviders
        providers={['mediaProvider', 'contextIdentifierProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider, contextIdentifierProvider }) => (
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
                  selection.from === getPos());

              return (
                <MediaSingleNode
                  width={width.width}
                  lineLength={width.lineLength}
                  node={this.node}
                  getPos={getPos}
                  mediaProvider={mediaProvider}
                  contextIdentifierProvider={contextIdentifierProvider}
                  mediaOptions={mediaOptions || {}}
                  view={this.view}
                  fullWidthMode={fullWidthMode}
                  selected={isSelected}
                  eventDispatcher={eventDispatcher}
                  mediaPluginState={mediaPluginState}
                  dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                />
              );
            }}
          />
        )}
      />
    );
  }

  ignoreMutation() {
    // DOM has changed; recalculate if we need to re-render
    if (this.dom) {
      const { offsetLeft } = this.dom;

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft;
        this.forceViewUpdate = true;

        this.update(this.node, [], () => true);
      }
    }

    return true;
  }
}

export const ReactMediaSingleNode =
  (
    portalProviderAPI: PortalProviderAPI,
    eventDispatcher: EventDispatcher,
    providerFactory: ProviderFactory,
    mediaOptions: MediaOptions = {},
    fullWidthMode?: boolean,
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
    isCopyPasteEnabled?: boolean,
  ) =>
  (node: PMNode, view: EditorView, getPos: getPosHandler) =>
    new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent,
      isCopyPasteEnabled,
    }).init();
