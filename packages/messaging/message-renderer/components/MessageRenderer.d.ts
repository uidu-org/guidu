import { Component } from 'react';
import { MessagesRendererProps } from '../types';
export default class MessageRenderer extends Component<MessagesRendererProps> {
    static defaultProps: {
        tagName: string;
    };
    render(): JSX.Element;
}
