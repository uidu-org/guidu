import { ChatWindowProps } from '@uidu/chat-window';
import { FileIdentifier } from '@uidu/media-core';
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
  id?: string;
  name: string;
  avatar: string;
};

export type Message = {
  id?: string | number;
  body?: string;
  message?: Message;
  replyTo?: Message;
  messager?: Messager;
  createdAt?: Date;
  attachments?: Array<FileIdentifier>;
  itemable?: any;
  mentionables?: Array<MentionProps>;
  children?: (props: any) => void;
  showAttachments?: boolean;
  mobileView?: boolean;
  reverse?: boolean;
  reactions?: any;
  // Functions for mobile
  onReply?: () => void;
  onMessageDrag?: () => void;
  onMessageDragEnd?: () => void;
} & Pick<ChatWindowProps, 'itemableProvider'>;

export type MessageGroupProps = {
  kind: string;
  messages: Array<Message>;
  messager: Messager;
  children: (props: any) => Array<Message>;
  mobileView?: boolean;
  isSelf?: (messager: Messager) => boolean;
};

export type MessageAttachmentsProps = {
  attachments: Array<FileIdentifier>;
  className?: string;
};
