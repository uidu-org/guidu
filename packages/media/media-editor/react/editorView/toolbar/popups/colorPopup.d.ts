import { Component } from 'react';
import { Color } from '../../../../common';
export interface ColorPopupProps {
    readonly isOpen: boolean;
    readonly color: Color;
    readonly onPickColor: (color: Color) => void;
}
export declare class ColorPopup extends Component<ColorPopupProps> {
    render(): JSX.Element;
    private renderButtons;
}
