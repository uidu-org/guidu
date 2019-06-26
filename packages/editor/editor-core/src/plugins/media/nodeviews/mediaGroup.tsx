import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import MediaFilmstrip from '@uidu/media-filmstrip';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import * as React from 'react';
import { PortalProviderAPI } from '../../../components/PortalProvider';
import WithPluginState from '../../../components/WithPluginState';
import ReactNodeView, { ForwardRef } from '../../../nodeviews/ReactNodeView';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import { EditorAppearance } from '../../../types';
import { setNodeSelection } from '../../../utils';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../../editor-disabled';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../pm-plugins/main';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export type MediaGroupProps = {
  forwardRef?: (ref: HTMLElement) => void;
  node: PMNode;
  view: EditorView;
  getPos: () => number;
  selected: number | null;
  disabled?: boolean;
  editorAppearance: EditorAppearance;
};

export interface MediaGroupState {
  viewContext?: any;
}

export default class MediaGroup extends React.Component<
  MediaGroupProps,
  MediaGroupState
> {
  private mediaPluginState: MediaPluginState;
  private mediaNodes: PMNode[];

  state: MediaGroupState = {
    viewContext: undefined,
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

  componentWillReceiveProps(props: MediaGroupProps) {
    this.updateMediaContext();
    this.setMediaItems(props);
  }

  shouldComponentUpdate(nextProps: MediaGroupProps) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.node !== nextProps.node ||
      this.state.viewContext !== this.mediaPluginState.mediaContext
    ) {
      return true;
    }

    return false;
  }

  updateMediaContext() {
    const { viewContext } = this.state;
    const { mediaContext } = this.mediaPluginState;
    if (!viewContext && mediaContext) {
      this.setState({
        viewContext: mediaContext,
      });
    }
  }

  setMediaItems = (props: MediaGroupProps) => {
    const { node } = props;
    this.mediaNodes = [] as Array<PMNode>;
    node.forEach((item, childOffset) => {
      this.mediaPluginState.mediaGroupNodes[item.attrs.id] = {
        node: item,
        getPos: () => props.getPos() + childOffset + 1,
      };
      this.mediaNodes.push(item);
    });
  };

  renderChildNodes = () => {
    const { viewContext } = this.state;
    const items = this.mediaNodes.map((item, idx) => {
      const identifier: any = {
        id: item.attrs.id,
        mediaItemType: 'file',
        collectionName: item.attrs.collection,
      };

      const nodePos = this.props.getPos() + idx + 1;
      return {
        identifier,
        selectable: true,
        isLazy: this.props.editorAppearance !== 'mobile',
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
    const { editorAppearance } = this.reactComponentProps;
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
          const nodePos = this.getPos();
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
              editorAppearance={editorAppearance}
            />
          );
        }}
      />
    );
  }
}

export const ReactMediaGroupNode = (
  portalProviderAPI: PortalProviderAPI,
  editorAppearance?: EditorAppearance,
) => (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
  return new MediaGroupNodeView(node, view, getPos, portalProviderAPI, {
    editorAppearance,
  }).init();
};
