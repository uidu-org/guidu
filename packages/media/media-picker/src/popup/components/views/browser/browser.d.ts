import { Component } from 'react';
import { ServiceAccountLink } from '../../../domain';
export interface BrowserStateProps {
    readonly service: ServiceAccountLink;
}
export declare type BrowserProps = BrowserStateProps;
export declare class Browser extends Component<BrowserProps> {
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof Browser, Pick<BrowserStateProps, never>>;
export default _default;
