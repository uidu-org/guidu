import { Component } from 'react';
export interface SidebarStateProps {
    readonly selected: string;
}
export declare type SidebarProps = SidebarStateProps;
export declare class StatelessSidebar extends Component<SidebarProps> {
    render(): JSX.Element;
    private getCloudPickingSidebarItems;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof StatelessSidebar, Pick<SidebarStateProps, never>>;
export default _default;
