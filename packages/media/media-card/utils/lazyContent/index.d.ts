import * as React from 'react';
export interface LazyContentProps {
    placeholder?: JSX.Element;
    children?: React.ReactNode;
    onRender?: () => void;
}
export interface LazyContentState {
}
export declare class LazyContent extends React.Component<LazyContentProps, LazyContentState> {
    render(): JSX.Element;
}
