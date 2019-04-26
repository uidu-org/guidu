import { Component } from 'react';
export interface SidebarItemOwnProps {
    readonly isActive: boolean;
}
export interface SidebarItemDispatchProps {
    readonly onChangeService: () => void;
}
export declare type SidebarItemProps = SidebarItemOwnProps & SidebarItemDispatchProps;
export declare class StatelessGiphySidebarItem extends Component<SidebarItemProps> {
    render(): JSX.Element;
}
declare const _default;
export default _default;
