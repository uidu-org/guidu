import { FragmentPosition } from './bitmapFragment';
export interface BitmapSize {
    width: number;
    height: number;
}
export declare class Bitmap {
    readonly size: BitmapSize;
    private readonly fragments;
    constructor(img: HTMLImageElement, gl: WebGLRenderingContext, supplementaryCanvas: HTMLCanvasElement);
    unload(contextLost: boolean): void;
    readonly numberOfFragments: number;
    getFragmentPosition(fragmentIndex: number): FragmentPosition | null;
    bindFragment(fragmentIndex: number): boolean;
    private applyToFragment;
    private splitToFragments;
}
