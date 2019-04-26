import { Component } from 'react';
export interface LineWidthPopupProps {
    readonly isOpen: boolean;
    readonly lineWidth: number;
    readonly onLineWidthClick: (lineWidth: number) => void;
}
export declare class LineWidthPopup extends Component<LineWidthPopupProps> {
    render(): JSX.Element;
    private buttons;
}
