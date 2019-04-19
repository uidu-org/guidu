import * as React from 'react';
import { MentionProps } from 'react-mentions';
export interface Message {
    id?: number;
    body?: string;
}
export declare type MessageableProps = {
    /** The base styling to apply to the button */
    messages: {
        hasMore: boolean;
        isFetching: boolean;
        messages: Array<Message>;
    };
};
export declare type MessageFormProps = {
    /** The base styling to apply to the button. */
    placeholder?: string;
    messageable: MessageableProps;
    message: Message;
    mentionables?: Array<MentionProps>;
    createMessage?: (messageable: MessageableProps, model: any) => any;
    updateMessage?: (messageable: MessageableProps, message: Message, model: any) => any;
    onDismiss: () => void;
    onSubmit: () => void;
};
export declare type MessageFormState = {
    /** The base styling to apply to the button. */
    attachments: Array<any>;
    /** The base styling to apply to the button. */
    submitted: boolean;
    emojiPicker: boolean;
    submitLabel?: React.ReactElement;
};
