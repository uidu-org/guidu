import { Component } from 'react';
import { Color } from '../../../../common';
export interface ColorButtonProps {
    readonly color: Color;
    readonly isActive: boolean;
    readonly onClick: () => void;
}
export declare class ColorButton extends Component<ColorButtonProps> {
    render(): JSX.Element;
}
