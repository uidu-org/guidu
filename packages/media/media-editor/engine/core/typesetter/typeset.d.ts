import * as Core from '../binaries/mediaEditor';
import { FontInfo } from './fontInfo';
export interface TypesetConfig {
    gl: WebGLRenderingContext;
    supplementaryCanvas: HTMLCanvasElement;
    textHelperDiv: HTMLDivElement;
    fontInfo: FontInfo;
    module: Core.NativeModule;
}
export declare class Typeset implements Core.TypesetInterop {
    private readonly config;
    private isContextLost;
    private fontMetrics;
    private paragraphs;
    private fragments;
    constructor(config: TypesetConfig);
    unload(): void;
    contextLost(): void;
    contextRestored(): void;
    update(text: string, textLength: number, direction: string, fontSize: number, cursorArray: number): boolean;
    getFragmentCount(): number;
    bindNormal(fragmentIndex: number): boolean;
    bindStroke(fragmentIndex: number): boolean;
    getXBase(fragmentIndex: number): number;
    getYBase(fragmentIndex: number): number;
    getXOpposite(fragmentIndex: number): number;
    getYOpposite(fragmentIndex: number): number;
    getLineHeight(): number;
    getDescent(): number;
    private destroy;
    private bindFragmentTexture;
    private getFragmentCoordinate;
    private updateParagraphs;
    private collectParagraphData;
    private collectFragments;
    private collectCursorPositions;
}
