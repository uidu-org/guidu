import { Node as PMNode, Schema } from 'prosemirror-model';
import { NodeReducer } from './';

const token: NodeReducer = (node: PMNode, schema: Schema) => {
  return `{{${node.attrs.id}}}`;
};

export default token;
