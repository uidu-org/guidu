import { Component } from 'react';
import { SelectedItem } from '../../domain';
export interface FooterStateProps {
    readonly selectedItems: SelectedItem[];
    readonly canInsert: boolean;
    readonly canCancel: boolean;
}
export interface FooterDispatchProps {
    readonly onInsert: (selectedItems: SelectedItem[]) => void;
    readonly onCancel: () => void;
}
export declare type FooterProps = FooterStateProps & FooterDispatchProps;
export declare class Footer extends Component<FooterProps> {
    renderCancelButton(): JSX.Element;
    renderInsertButton(): JSX.Element | null;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
