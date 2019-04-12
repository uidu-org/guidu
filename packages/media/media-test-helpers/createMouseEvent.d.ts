export interface MouseEventProps {
    mouseButton?: number;
    clientX?: number;
    clientY?: number;
    screenX?: number;
    screenY?: number;
}
export declare const createMouseEvent: (name: string, props?: MouseEventProps) => MouseEvent;
