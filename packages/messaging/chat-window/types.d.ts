import { MessageableProps } from '@uidu/message-form';
export declare type ChatWindowType = {
    /** The base styling to apply to the button */
    messageable: MessageableProps;
    /** The base styling to apply to the button */
    fetchMessages: (messageable: MessageableProps, lastId: number) => Array<any>;
};
