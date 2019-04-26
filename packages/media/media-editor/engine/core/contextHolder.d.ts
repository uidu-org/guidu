import { DrawingArea, OutputSize } from '../components/drawingArea';
import { Signal } from '../signal';
export declare class ContextHolder {
    readonly gl: WebGLRenderingContext;
    readonly contextLost: Signal<{}>;
    readonly contextRestored: Signal<OutputSize>;
    private readonly canvas;
    private readonly contextLostListener;
    private readonly contextRestoredListener;
    constructor(drawingArea: DrawingArea);
    unload(): void;
    static getContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
}
