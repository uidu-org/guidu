import { MessageableProps, MessageFormProps } from '@uidu/message-form';
export declare type ChatWindowType = MessageFormProps & {
    /** The base styling to apply to the button */
    fetchMessages: (messageable: MessageableProps, lastId: number) => Array<any>;
};
