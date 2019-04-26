export interface FragmentPosition {
    xbase: number;
    ybase: number;
    xopposite: number;
    yopposite: number;
}
export declare class Fragment {
    private readonly gl;
    private readonly normal;
    private readonly stroke;
    readonly position: FragmentPosition;
    constructor(gl: WebGLRenderingContext, normal: WebGLTexture, stroke: WebGLTexture, position: FragmentPosition);
    unload(isContextLost: boolean): void;
    bindNormal(): boolean;
    bindStroke(): boolean;
    private bindTexture;
}
