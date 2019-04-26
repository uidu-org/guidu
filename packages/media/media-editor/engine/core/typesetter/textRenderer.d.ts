import { Fragment } from './fragment';
import { FontInfo } from './fontInfo';
import { TextDirection } from '../../../common';
export interface TextRenderingConfig {
    text: string;
    direction: TextDirection;
    fontSize: number;
    fontInfo: FontInfo;
    supplementaryCanvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
}
export declare const renderText: (fragments: Fragment[], config: TextRenderingConfig) => boolean;
