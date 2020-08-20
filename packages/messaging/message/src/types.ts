import { ChatWindowProps } from '@uidu/chat-window';
import { FileIdentifier } from '@uidu/media-core';
import { MentionProps } from 'react-mentions';

export type MessageableProps = {
  /** The base styling to apply to the button */
  messages: {
    hasMore: boolean;
    isFetching: boolean;
    messages: Array<MessageProps>;
  };
};

export type Messager = {
  id?: string;
  name: string;
  avatar: string;
};

export type Attachment = {
  id: string;
  file: FileIdentifier;
};

export type MessageProps = {
  id?: string | number;
  body?: string;
  message?: MessageProps;
  replyTo?: MessageProps;
  messager?: Messager;
  createdAt?: Date;
  attachments?: Array<Attachment>;
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
  scrollable?: React.RefObject<HTMLDivElement>;
} & Pick<ChatWindowProps, 'itemableProvider'>;

export type MessageGroupProps = {
  kind: string;
  messages: Array<MessageProps>;
  messager: Messager;
  children: (props: any) => Array<MessageProps>;
  mobileView?: boolean;
  isSelf?: (messager: Messager) => boolean;
};

export type MessageAttachmentsProps = {
  scrollable: React.RefObject<HTMLDivElement>;
  attachments: Array<Attachment>;
  className?: string;
};
