import { MessageableProps, MessageFormProps } from '@uidu/message-form';

export type ChatWindowType = MessageFormProps & {
  /** The base styling to apply to the button */
  fetchMessages: (messageable: MessageableProps, lastId: number) => Array<any>;
  /** The base styling to apply to the button */
  betweenMinutes: number;
  /** The base styling to apply to the button */
  actions: ({ editing, setEditing, message, onDropdownChange }) => Array<any>;
  /** The base styling to apply to the button */
  /** The base styling to apply to the button */
  onReply: (message: any) => void;
  /** The base styling to apply to the button */
  onReact: (message: any) => void;
};
