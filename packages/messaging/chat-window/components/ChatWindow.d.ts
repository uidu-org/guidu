import { Component } from 'react';
import { ChatWindowType } from 'src/types';
export default class ChatWindow extends Component<ChatWindowType> {
    static defaultProps: {
        messageable: {};
        organizationMembers: never[];
        fetchMessages: () => void;
    };
    render(): JSX.Element;
}
