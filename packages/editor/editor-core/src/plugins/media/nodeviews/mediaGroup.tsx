import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { ProviderFactory } from '@uidu/editor-common';
import MediaFilmstrip from '@uidu/media-filmstrip';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { getPosHandler } from '../../../nodeviews';
import ReactNodeView, { ForwardRef } from '../../../nodeviews/ReactNodeView';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import { setNodeSelection } from '../../../utils';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../../editor-disabled';
import { stateKey as mediaStateKey } from '../pm-plugins/plugin-key';
import { MediaPluginState } from '../pm-plugins/types';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export type MediaGroupProps = {
  forwardRef?: (ref: HTMLElement) => void;
  node: PMNode;
  view: EditorView;
  getPos: getPosHandler;
  selected: number | null;
  disabled?: boolean;
};

export interface MediaGroupState {
  viewMediaClientConfig?: any;
}

export default class MediaGroup extends React.Component<
  MediaGroupProps,
  MediaGroupState
> {
  private mediaPluginState: MediaPluginState;
  private mediaNodes: PMNode[];

  state: MediaGroupState = {
    viewMediaClientConfig: undefined,
  };

  constructor(props: MediaGroupProps) {
    super(props);
    this.mediaNodes = [];
    this.mediaPluginState = mediaStateKey.getState(props.view.state);
    this.setMediaItems(props);
  }

  componentDidMount() {
    this.updateMediaContext();
  }

  UNSAFE_componentWillReceiveProps(props: MediaGroupProps) {
    this.updateMediaContext();
    this.setMediaItems(props);
  }

  shouldComponentUpdate(nextProps: MediaGroupProps) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.node !== nextProps.node ||
      this.state.viewMediaClientConfig !==
        this.mediaPluginState.mediaClientConfig
    ) {
      return true;
    }

    return false;
  }

  updateMediaContext() {
    const { viewMediaClientConfig } = this.state;
    const { mediaClientConfig } = this.mediaPluginState;
    if (!viewMediaClientConfig && mediaClientConfig) {
      this.setState({
        viewMediaClientConfig: mediaClientConfig,
      });
    }
  }

  setMediaItems = (props: MediaGroupProps) => {
    const { node } = props;
    this.mediaNodes = [] as Array<PMNode>;
    node.forEach((item, childOffset) => {
      this.mediaPluginState.mediaGroupNodes[item.attrs.id] = {
        node: item,
        getPos: () =>
          (typeof props.getPos === 'function'
            ? props.getPos()
            : +props.getPos) +
          childOffset +
          1,
      };
      this.mediaNodes.push(item);
    });
  };

  renderChildNodes = () => {
    const { viewMediaClientConfig } = this.state;
    const items = this.mediaNodes.map((item, idx) => {
      const identifier: any = {
        id: item.attrs.id,
        mediaItemType: 'file',
      };

      const nodePos =
        (typeof this.props.getPos === 'function'
          ? this.props.getPos()
          : +this.props.getPos) +
        idx +
        1;
      return {
        identifier,
        selectable: true,
        isLazy: false,
        selected: this.props.selected === nodePos,
        onClick: () => {
          setNodeSelection(this.props.view, nodePos);
        },
        actions: [
          {
            handler: this.props.disabled
              ? {}
              : this.mediaPluginState.handleMediaNodeRemoval.bind(
                  null,
                  null,
                  () => nodePos,
                ),
            icon: <EditorCloseIcon label="delete" />,
          },
        ],
      };
    });

    return <MediaFilmstrip files={items as any} />;
  };

  render() {
    return this.renderChildNodes();
  }
}

class MediaGroupNodeView extends ReactNodeView {
  render(_props: any, forwardRef: ForwardRef) {
    return (
      <WithPluginState
        editorView={this.view}
        plugins={{
          reactNodeViewState: reactNodeViewStateKey,
          editorDisabledPlugin: editorDisabledPluginKey,
        }}
        render={({
          editorDisabledPlugin,
        }: {
          editorDisabledPlugin: EditorDisabledPluginState;
        }) => {
          const nodePos =
            typeof this.getPos === 'function' ? this.getPos() : +this.getPos;
          const { $anchor, $head } = this.view.state.selection;
          const isSelected =
            nodePos < $anchor.pos && $head.pos < nodePos + this.node.nodeSize;
          return (
            <MediaGroup
              node={this.node}
              getPos={this.getPos}
              view={this.view}
              forwardRef={forwardRef}
              selected={isSelected ? $anchor.pos : null}
              disabled={(editorDisabledPlugin || ({} as any)).editorDisabled}
            />
          );
        }}
      />
    );
  }
}

export const ReactMediaGroupNode = (
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  allowLazyLoading?: boolean,
  isCopyPasteEnabled?: boolean,
) => (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView => {
  return new MediaGroupNodeView(node, view, getPos, portalProviderAPI, {
    allowLazyLoading,
    providerFactory,
    isCopyPasteEnabled,
  }).init();
};
