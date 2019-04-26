import * as Core from './binaries/mediaEditor';
export declare class BitmapExporter implements Core.BitmapExporterInterop {
    private supplementaryCanvas;
    private module;
    constructor(supplementaryCanvas: HTMLCanvasElement, module: Core.NativeModule);
    prepare(imageWidth: number, imageHeight: number): boolean;
    putImagePart(left: number, top: number, width: number, height: number, buffer: number, bufferLength: number): void;
    getBase64Image(format: string): string;
}
