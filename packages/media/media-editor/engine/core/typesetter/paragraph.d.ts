import { TextDirection } from '../../../common';
import { FontInfo } from './fontInfo';
import { Fragment } from './fragment';
export interface ParagraphConfig {
    gl: WebGLRenderingContext;
    supplementaryCanvas: HTMLCanvasElement;
    textHelperDiv: HTMLDivElement;
    fontInfo: FontInfo;
}
export declare class Paragraph {
    private config;
    private text;
    private direction;
    private fontSize;
    private isValid;
    private fragments;
    private cursorPositions;
    constructor(config: ParagraphConfig);
    unload(isContextLost: boolean): void;
    readonly textFragments: Array<Fragment>;
    readonly textCursorPositions: Array<number>;
    update(text: string, direction: TextDirection, fontSize: number): boolean;
    private destroy;
    private createFragments;
    private calculateCursorPositions;
}
