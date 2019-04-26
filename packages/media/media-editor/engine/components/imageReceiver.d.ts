import { Component } from './component';
export interface ImageReceiver extends Component {
    readonly supplementaryCanvas: HTMLCanvasElement;
}
export declare class DefaultImageReceiver implements ImageReceiver {
    readonly supplementaryCanvas: HTMLCanvasElement;
    constructor(supplementaryCanvas: HTMLCanvasElement);
    unload(): void;
}
