import { Component } from './component';
import { Signal } from '../signal';
export declare type InputCommand = 'complete' | 'newline' | 'backspace' | 'delete' | 'left' | 'right' | 'up' | 'down';
export interface KeyboardInput extends Component {
    startInput(): void;
    endInput(): void;
    characterPressed: Signal<number>;
    inputCommand: Signal<InputCommand>;
    readonly supplementaryCanvas: HTMLCanvasElement;
    readonly textHelperDiv: HTMLDivElement;
}
export declare class DefaultKeyboardInput implements KeyboardInput {
    private hTextArea;
    readonly supplementaryCanvas: HTMLCanvasElement;
    readonly textHelperDiv: HTMLDivElement;
    readonly characterPressed: Signal<number>;
    readonly inputCommand: Signal<InputCommand>;
    private readonly inputListener;
    private readonly compositionStartListener;
    private readonly compositionEndListener;
    private readonly keyUpListener;
    private readonly keyDownListener;
    private readonly blurListener;
    private isInputActive;
    private isComposing;
    private readCompositionResultOnKeyUp;
    constructor(hTextArea: HTMLTextAreaElement, supplementaryCanvas: HTMLCanvasElement, textHelperDiv: HTMLDivElement);
    unload(): void;
    startInput(): void;
    endInput(): void;
    private subscribeToTextAreaEvents;
    private unsubscribeFromTextAreaEvents;
    private input;
    private compositionStart;
    private compositionEnd;
    private keyUp;
    private keyDown;
    private blur;
    private acquireFocus;
    private passText;
}
