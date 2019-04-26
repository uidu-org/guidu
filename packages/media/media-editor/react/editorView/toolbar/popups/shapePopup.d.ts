import { Component } from 'react';
import { Tool } from '../../../../common';
export declare const shapeTools: Tool[];
export interface ShapePopupProps {
    readonly isOpen: boolean;
    readonly shape: Tool;
    readonly onPickShape: (tool: Tool) => void;
}
export declare class ShapePopup extends Component<ShapePopupProps> {
    render(): JSX.Element;
    private renderButtons;
}
