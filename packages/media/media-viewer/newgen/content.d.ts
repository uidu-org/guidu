import { Component, ReactNode } from 'react';
export interface ContentProps {
    onClose?: () => void;
    children: ReactNode;
}
export interface ContentState {
    showControls: boolean;
}
export declare const findParent: (element: HTMLElement, className: string, maxParentElement?: HTMLElement) => HTMLElement;
export declare class Content extends Component<ContentProps, ContentState> {
    private checkActivityTimeout?;
    private contentWrapperElement?;
    state: ContentState;
    private clearTimeout;
    private hideControls;
    private checkMouseMovement;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onClick;
    private saveContentWrapperRef;
    render(): JSX.Element;
}
