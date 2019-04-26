import * as Core from '../binaries/mediaEditor';
export interface BrowserTypesetterConfig {
    gl: WebGLRenderingContext;
    supplementaryCanvas: HTMLCanvasElement;
    textHelperDiv: HTMLDivElement;
    module: Core.NativeModule;
}
export declare class BrowserTypesetter implements Core.BrowserTypesetterInterop {
    private readonly config;
    private typesets;
    private fontInfo;
    constructor(config: BrowserTypesetterConfig);
    unload(): void;
    createTypeset(): number;
    deleteTypeset(index: number): void;
    getTypeset(index: number): Core.TypesetInterop;
    handleContextLost(): void;
    handleContextRestored(): void;
}
