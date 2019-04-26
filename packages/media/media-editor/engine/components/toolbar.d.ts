import { Component } from './component';
import { Color, ShapeParameters, Tool } from '../../common';
import { Signal } from '../signal';
export interface Toolbar extends Component {
    updateByCore(parameters: ShapeParameters): void;
    colorChanged: Signal<Color>;
    lineWidthChanged: Signal<number>;
    addShadowChanged: Signal<boolean>;
    toolChanged: Signal<Tool>;
}
export declare type UpdateByCoreHandler = (parameters: ShapeParameters) => void;
export declare class DefaultToolbar implements Toolbar {
    private readonly onUpdateByCore;
    readonly colorChanged: Signal<Color>;
    readonly lineWidthChanged: Signal<number>;
    readonly addShadowChanged: Signal<boolean>;
    readonly toolChanged: Signal<Tool>;
    constructor(onUpdateByCore: UpdateByCoreHandler);
    unload(): void;
    updateByCore(parameters: ShapeParameters): void;
    setColor(color: Color): void;
    setLineWidth(lineWidth: number): void;
    setAddShadow(addShadow: boolean): void;
    setTool(tool: Tool): void;
}
