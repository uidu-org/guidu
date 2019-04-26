import { Component, ReactNode } from 'react';
import { ServiceName as ServiceNameDomain } from '../../../domain';
export interface SidebarItemOwnProps {
    readonly serviceName: ServiceNameDomain;
    readonly serviceFullName: ReactNode;
    readonly isActive: boolean;
}
export interface SidebarItemDispatchProps {
    readonly onChangeService: (serviceName: ServiceNameDomain) => void;
}
export declare type SidebarItemProps = SidebarItemOwnProps & SidebarItemDispatchProps;
export declare class StatelessSidebarItem extends Component<SidebarItemProps> {
    render(): JSX.Element;
    private onClick;
}
declare const _default;
export default _default;
