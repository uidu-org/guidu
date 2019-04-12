import { Component } from 'react';
export interface HrefProps {
    linkUrl?: string;
    underline?: boolean;
    className?: string;
    [propName: string]: any;
}
export declare class Href extends Component<HrefProps, {}> {
    render(): JSX.Element;
}
