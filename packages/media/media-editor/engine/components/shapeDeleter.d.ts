import { Component } from './component';
import { Signal } from '../signal';
export interface ShapeDeleter extends Component {
    deleteEnabled(): void;
    deleteDisabled(): void;
    readonly deleteShape: Signal<{}>;
}
export declare class DefaultShapeDeleter implements ShapeDeleter {
    private readonly hTextArea;
    readonly deleteShape: Signal<{}>;
    private readonly keyDownListener;
    private isDeleteEnabled;
    constructor(hTextArea: HTMLTextAreaElement);
    unload(): void;
    deleteEnabled(): void;
    deleteDisabled(): void;
    private keyDown;
}
