import { Component } from './component';
import { Signal } from '../signal';
export interface ScreenPoint {
    x: number;
    y: number;
}
export interface MouseInput extends Component {
    click: Signal<ScreenPoint>;
    dragStart: Signal<ScreenPoint>;
    dragMove: Signal<ScreenPoint>;
    dragEnd: Signal<ScreenPoint>;
    dragLost: Signal<{}>;
}
export declare type PositionCalculator = (event: MouseEvent) => ScreenPoint;
export declare class DefaultMouseInput implements MouseInput {
    private readonly inputArea;
    readonly click: Signal<ScreenPoint>;
    readonly dragStart: Signal<ScreenPoint>;
    readonly dragMove: Signal<ScreenPoint>;
    readonly dragEnd: Signal<ScreenPoint>;
    readonly dragLost: Signal<{}>;
    private readonly mouseDownListener;
    private readonly mouseMoveListener;
    private readonly mouseUpListener;
    private readonly mouseLostListener;
    private readonly getPosition;
    private isDragging;
    private isCapturingInput;
    private initialPosition;
    constructor(inputArea: HTMLElement, positionCalculator?: PositionCalculator);
    unload(): void;
    private mouseDown;
    private mouseMove;
    private mouseUp;
    private mouseLost;
    private interruptInputIfNecessary;
    private subscribeToWindowEvents;
    private unsubscribeFromWindowEvents;
    private defaultPositionCalculator;
}
