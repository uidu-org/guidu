import { Component } from './component';
export interface ImageProvider extends Component {
    readonly backImage: HTMLImageElement;
    readonly backImageUuid: string;
    readonly supplementaryCanvas: HTMLCanvasElement;
}
export declare type ImageLoader = () => Promise<HTMLImageElement>;
export declare const urlImageLoader: (url: string) => Promise<HTMLImageElement>;
export declare class DefaultImageProvider implements ImageProvider {
    readonly backImage: HTMLImageElement;
    readonly supplementaryCanvas: HTMLCanvasElement;
    static create(imageLoader: ImageLoader, supplementaryCanvas: HTMLCanvasElement): Promise<DefaultImageProvider>;
    private constructor();
    readonly backImageUuid: string;
    unload(): void;
}
