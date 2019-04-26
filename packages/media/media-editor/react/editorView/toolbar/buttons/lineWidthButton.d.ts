import { Component } from 'react';
export interface LineWidthButtonProps {
    readonly lineWidth: number;
    readonly isActive: boolean;
    readonly onClick: () => void;
}
export declare class LineWidthButton extends Component<LineWidthButtonProps> {
    render(): JSX.Element;
}
