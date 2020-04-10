import { Node } from 'prosemirror-model';

export interface Transformer<T> {
  encode(node: Node): T;
  parse(content: T): Node;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  NO_ORDER = 'no_order',
}

export { CollabEditProvider } from '../provider-factory/collab-edit-provider';
export {
  CollabeEventPresenceData,
  CollabEvent,
  CollabEventConnectionData,
  CollabEventData,
  CollabEventInitData,
  CollabEventRemoteData,
  CollabEventTelepointerData,
  CollabParticipant,
  CollabSendableSelection,
} from './collab';
export { TypeAheadItem, TypeAheadItemRenderProps } from './typeAhead';
