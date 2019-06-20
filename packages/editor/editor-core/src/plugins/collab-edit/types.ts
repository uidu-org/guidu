import { ReactElement } from 'react';
import { EditorState } from 'prosemirror-state';
import { CollabEditProvider } from './provider';

export interface Participant {
  lastActive: number;
  sessionId: string;
  avatar: string;
  name: string;
  email: string;
}

export interface InitData {
  doc?: any;
  json?: any;
  version?: number;
  sid?: string;
}

export interface RemoteData {
  json?: any;
  newState?: EditorState;
  userIds?: string[];
}

export interface ConnectionData {
  sid: string;
}

export interface PresenceData {
  joined?: Participant[];
  left?: { sessionId: string }[];
}

export interface TelepointerData {
  type: 'telepointer';
  selection: SendableSelection;
  sessionId: string;
}

export interface SendableSelection {
  type: 'textSelection' | 'nodeSelection';
  anchor: number;
  head: number;
}

export type InviteToEditComponentProps = {
  children: ReactElement<InviteToEditButtonProps>;
};

export type InviteToEditButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  selected: boolean;
};

export interface CollabInviteToEditProps {
  inviteToEditHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  isInviteToEditButtonSelected?: boolean;
  inviteToEditComponent?: React.ComponentType<InviteToEditComponentProps>;
}

export type CollabEditOptions = {
  provider?: Promise<CollabEditProvider>;
  userId?: string;
  useNativePlugin?: boolean;
  allowUnsupportedContent?: boolean;
} & CollabInviteToEditProps;
