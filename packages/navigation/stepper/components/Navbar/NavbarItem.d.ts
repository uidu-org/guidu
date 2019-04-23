import React, { Component } from 'react';
export declare type NavbarItemProps = {
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    index: number;
    name: string;
    path: string;
    className?: string;
    children?: React.ReactNode;
};
export default class NavbarItem extends Component<NavbarItemProps> {
    onMouseEnter: () => void;
    render(): JSX.Element;
}
