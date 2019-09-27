import { MarkSpec, NodeSpec } from 'prosemirror-model';
import { NodeView } from 'prosemirror-view';
import {
  PMPlugin,
  ToolbarUIComponentFactory,
  UIComponentFactory,
} from './editor-plugin';

export interface NodeConfig {
  name: string;
  node: NodeSpec;
}

export interface MarkConfig {
  name: string;
  mark: MarkSpec;
}

export interface NodeViewConfig {
  name: string;
  nodeView: NodeView;
}

export interface EditorConfig {
  nodes: NodeConfig[];
  marks: MarkConfig[];
  pmPlugins: Array<PMPlugin>;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: ToolbarUIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
}
