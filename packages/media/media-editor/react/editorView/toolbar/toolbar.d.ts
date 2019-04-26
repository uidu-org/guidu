import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Tool, Color } from '../../../common';
export declare type PopupState = 'none' | 'color' | 'lineWidth' | 'shape';
export declare const tools: Tool[];
export interface ToolbarProps {
    readonly color: Color;
    readonly tool: Tool;
    readonly lineWidth: number;
    readonly onSave: () => void;
    readonly onCancel: () => void;
    readonly onToolChanged: (tool: Tool) => void;
    readonly onColorChanged: (color: Color) => void;
    readonly onLineWidthChanged: (lineWidth: number) => void;
}
export interface ToolbarState {
    readonly popup: PopupState;
}
export declare class Toolbar extends Component<ToolbarProps & InjectedIntlProps, ToolbarState> {
    state: ToolbarState;
    onColorButtonClick: () => void;
    onLineWidthButtonClick: () => void;
    onShapeButtonClick: () => void;
    render(): JSX.Element;
    private onToolClick;
    private renderSimpleTool;
    private showOrHidePopup;
}
declare const _default: React.ComponentClass<Pick<ToolbarProps, "color" | "tool" | "lineWidth" | "onSave" | "onCancel" | "onToolChanged" | "onColorChanged" | "onLineWidthChanged">, any> & {
    WrappedComponent: React.ComponentType<ToolbarProps & InjectedIntlProps>;
};
export default _default;
