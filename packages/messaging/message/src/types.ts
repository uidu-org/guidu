import { Identifier } from '@uidu/media-core';
import { MentionProps } from 'react-mentions';

export type MessageableProps = {
  /** The base styling to apply to the button */
  messages: {
    hasMore: boolean;
    isFetching: boolean;
    messages: Array<Message>;
  };
};

export type Messager = {
  name: string;
  avatar: {
    thumb: string;
  };
}

export type Message = {
  id?: string | number;
  body?: string,
  message?: Message;
  replyTo?: Message;
  messager?: Messager;
  createdAt?: Date;
  attachments?: Array<any>;
  messageable: MessageableProps;
  mentionables?: Array<MentionProps>;
  children?: (props: any) => void;
  showAttachments?: boolean;
  mobileView?: boolean;
  // Functions for mobile
  onReply?: () => void;
  onMessageDrag?: () => void;
  onMessageDragEnd?: () => void;
}

export type MessageState = {
  editing: boolean;
  hovered: boolean;
  isDropdownOpen: boolean;
}

export type MessageGroupProps = {
  kind: string;
  messages: Array<Message>;
  messager: Messager;
  children: (props: any) => Array<Message>;
}

export type MessageAttachmentsProps = {
  attachments: Array<any>;
}

export type MessageAttachmentsState = {
  animate: boolean;
  offset: number;
  selectedItem?: Identifier | undefined,
}
