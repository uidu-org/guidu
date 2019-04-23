import React, { Component } from 'react';
export declare type DropdownContainerProps = {
    children: React.ReactNode;
    animatingOut?: boolean;
    direction?: 'left' | 'right';
    duration?: number;
};
declare class DropdownContainer extends Component<DropdownContainerProps> {
    private altBackgroundEl;
    private prevDropdownEl;
    private currentDropdownEl;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default DropdownContainer;
