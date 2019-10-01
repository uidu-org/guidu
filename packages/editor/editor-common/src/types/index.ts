import { Node } from 'prosemirror-model';
export {
  Extension,
  ExtensionHandler,
  ExtensionHandlers,
  ExtensionParams,
  UpdateExtension,
} from './extension-handler';

export interface Transformer<T> {
  encode(node: Node): T;
  parse(content: T): Node;
}

export interface Providers {
  [key: string]: Promise<any>;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  NO_ORDER = 'no_order',
}
