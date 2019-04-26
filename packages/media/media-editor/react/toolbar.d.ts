import * as React from 'react';
import { Color, Tool } from '../common';
export declare type ColorChangedHandler = (color: Color) => void;
export declare type ToolChangedHandler = (tool: Tool) => void;
export declare type LineWidthChangedHandler = (lineWidth: number) => void;
export interface ToolbarProps {
    color: Color;
    tool: Tool;
    lineWidth: number;
    onColorChanged: ColorChangedHandler;
    onToolChanged: ToolChangedHandler;
    onLineWidthChanged: LineWidthChangedHandler;
}
export declare class Toolbar extends React.Component<ToolbarProps, {}> {
    constructor(props: ToolbarProps);
    render(): JSX.Element;
    private createColorButton;
    private createLineWidthButton;
    private createToolButton;
}
