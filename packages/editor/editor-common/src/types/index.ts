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

export type { CollabEditProvider } from '../provider-factory/collab-edit-provider';
export type {
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
export type { TypeAheadItem, TypeAheadItemRenderProps } from './typeAhead';
