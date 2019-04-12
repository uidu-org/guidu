import { Component } from 'react';
export declare const keyCodes: {
    space: number;
    m: number;
};
export interface ShortcutProps {
    keyCode: number;
    handler: () => void;
}
export declare class Shortcut extends Component<ShortcutProps, {}> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): any;
    private keyHandler;
    private init;
    private release;
}
