import { Message } from '@uidu/message';
import { MessageFormProps } from '@uidu/message-form';
import * as React from 'react';

export type ChatWindowProps = {
  /** The base styling to apply to the button */
  hasMore: boolean;
  /** The base styling to apply to the button */
  isLoading: boolean;
  /** The base styling to apply to the button */
  messages: Array<Message>;
  /** The base styling to apply to the button */
  onInfiniteLoad: () => Promise<any>;
  /** The base styling to apply to the button */
  betweenMinutes: number;
  formActions: Array<any>;
  formAttachments: Array<any>;
  /** The base styling to apply to the button */
  actions: ({ editing, setEditing, message, onDropdownChange }) => Array<any>;
  /** The base styling to apply to the button */
  /** The base styling to apply to the button */
  onReply: (message: any) => void;
  /** The base styling to apply to the button */
  onReact: (message: any) => void;
  isSelf: (messager: any) => boolean;
  forwardedRef?: any;
} & MessageFormProps;

export type ChatWindowState = {
  replyTo: Message | null;
};

export type ChatViewProps = {
  flipped?: boolean;
  reversed?: boolean;
  scrollLoadThreshold?: number;
  shouldTriggerLoad?: () => boolean;
  onInfiniteLoad: () => Promise<any>;
  loadingSpinnerDelegate?: React.ReactNode;
  className?: string;
  forwardedRef?: any;
  children?: any;
};

export type ChatViewState = {
  isInfiniteLoading: boolean;
};
