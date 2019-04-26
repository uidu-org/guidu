import * as React from 'react';
import { Color, Tool } from '../common';
export declare type ClickHandler = () => void;
export interface ButtonProps {
    selected: boolean;
    onClick: ClickHandler;
}
export interface ColorButtonProps extends ButtonProps {
    color: Color;
}
export declare class ColorButton extends React.Component<ColorButtonProps, {}> {
    render(): JSX.Element;
}
export interface LineWidthButtonProps extends ButtonProps {
    lineWidth: number;
}
export declare class LineWidthButton extends React.Component<LineWidthButtonProps, {}> {
    render(): JSX.Element;
}
export interface ToolButtonProps extends ButtonProps {
    tool: Tool;
}
export declare class ToolButton extends React.Component<ToolButtonProps, {}> {
    render(): JSX.Element;
    private createIcon;
}
