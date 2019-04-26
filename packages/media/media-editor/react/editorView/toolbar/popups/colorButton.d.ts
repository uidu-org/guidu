import { Component } from 'react';
import { Color } from '../../../../common';
export interface ColorButtonProps {
    readonly color: Color;
    readonly currentColor: Color;
    readonly onClick: (color: Color) => void;
}
export declare class ColorButton extends Component<ColorButtonProps> {
    render(): JSX.Element;
    private checkMark;
}
