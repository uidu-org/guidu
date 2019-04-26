import { Component } from 'react';
export interface LineWidthButtonProps {
    readonly lineWidth: number;
    readonly currentLineWidth: number;
    readonly onLineWidthClick: (lineWidth: number) => void;
}
export declare class LineWidthIcon extends Component<LineWidthButtonProps> {
    render(): JSX.Element;
}
