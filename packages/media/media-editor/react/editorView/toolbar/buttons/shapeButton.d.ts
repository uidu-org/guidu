import { Component } from 'react';
import { Tool } from '../../../../common';
export interface ShapeButtonProps {
    readonly activeShape: Tool;
    readonly isActive: boolean;
    readonly onClick: () => void;
}
export declare class ShapeButton extends Component<ShapeButtonProps> {
    render(): JSX.Element;
}
