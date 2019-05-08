import Message, { MessageableProps } from '@uidu/message';
import { MessageFormProps } from '@uidu/message-form';
import * as React from 'react';

export type ChatWindowProps = MessageFormProps & {
  /** The base styling to apply to the button */
  fetchMessages: (messageable: MessageableProps, lastId: number | string) => Promise<any>;
  /** The base styling to apply to the button */
  betweenMinutes: number;
  formActions: Array<any>;
  /** The base styling to apply to the button */
  actions: ({ editing, setEditing, message, onDropdownChange }) => Array<any>;
  /** The base styling to apply to the button */
  /** The base styling to apply to the button */
  onReply: (message: any) => void;
  /** The base styling to apply to the button */
  onReact: (message: any) => void;
};

export type ChatWindowState = {
  replyTo: Message | null;
}

export type ChatViewProps = {
  flipped?: boolean;
  reversed?: boolean;
  scrollLoadThreshold?: number;
  shouldTriggerLoad?: () => boolean;
  onInfiniteLoad: () => Promise<any>;
  loadingSpinnerDelegate: React.ReactNode,
  className?: string;
  returnScrollable?: (element: HTMLDivElement) => void;
}

export type ChatViewState = {
  isInfiniteLoading: boolean;
}
