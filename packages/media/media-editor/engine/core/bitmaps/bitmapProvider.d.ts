import * as Core from '../binaries/mediaEditor';
import { ImageProvider } from '../../components/imageProvider';
export declare class BitmapProvider implements Core.BitmapProviderInterop {
    private imageProvider;
    private gl;
    private bitmap;
    private fragmentPosition;
    constructor(imageProvider: ImageProvider, gl: WebGLRenderingContext);
    unload(): void;
    handleContextLost(): void;
    handleContextRestored(): void;
    private createBitmap;
    private destroyBitmap;
    getBitmapIndex(uuid: string): number;
    getBitmapWidth(): number;
    getBitmapHeight(): number;
    getNumberOfFragments(): number;
    queryFragmentCoordinates(_: number, fragmentIndex: number): boolean;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    getUTopLeft(): number;
    getVTopLeft(): number;
    getUBottomRight(): number;
    getVBottomRight(): number;
    bind(_: number, fragmentIndex: number): boolean;
}
