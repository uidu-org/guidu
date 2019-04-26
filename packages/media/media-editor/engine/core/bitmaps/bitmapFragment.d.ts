export declare type FragmentPosition = {
    x: number;
    y: number;
    width: number;
    height: number;
    uTopLeft: number;
    vTopLeft: number;
    uBottomRight: number;
    vBottomRight: number;
};
export declare class BitmapFragment {
    private readonly gl;
    readonly position: FragmentPosition;
    private readonly texture;
    constructor(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number, image: HTMLImageElement, supplementaryCanvas: HTMLCanvasElement);
    unload(contextLost: boolean): void;
    bind(): boolean;
    private createTexture;
}
