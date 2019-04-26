import { ColorWithAlpha } from '../../common';
import { Component } from './component';
import { Signal } from '../signal';
export interface OutputSize {
    width: number;
    height: number;
    screenScaleFactor: number;
}
export interface DrawingArea extends Component {
    readonly canvas: HTMLCanvasElement;
    readonly outputSize: OutputSize;
    readonly backgroundColor: ColorWithAlpha;
    readonly resize: Signal<OutputSize>;
}
export declare class DefaultDrawingArea implements DrawingArea {
    readonly canvas: HTMLCanvasElement;
    private size;
    readonly backgroundColor: ColorWithAlpha;
    readonly resize: Signal<OutputSize>;
    constructor(canvas: HTMLCanvasElement, size: OutputSize, backgroundColor: ColorWithAlpha);
    readonly outputSize: OutputSize;
    unload(): void;
    setSize(size: OutputSize): void;
    private setCanvasSize;
}
