import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { MessageFormProps, MessageFormState } from '../types';
export default class MessagesForm extends React.Component<MessageFormProps, MessageFormState> {
    private form;
    private mentionsInput;
    private mentionsComponentInput;
    static defaultProps: {
        placeholder: string;
        onSubmit: () => void;
        onDismiss: () => void;
        createMessage: {
            (message?: any, ...optionalParams: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        updateMessage: {
            (message?: any, ...optionalParams: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
    constructor(props: MessageFormProps);
    isValid: (canSubmit: boolean) => boolean;
    handleSubmitLabel: (_name: string, value: string | Object) => void;
    handleSubmit: (model: any) => Promise<any>;
    handleThumb: () => any;
    messageSender: () => JSX.Element;
    thumbSender: () => JSX.Element;
    render(): JSX.Element;
}
