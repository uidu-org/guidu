export interface TouchEventProps {
    touches: Touch[];
}
export declare const createTouchEvent: (name: string, props?: TouchEventProps) => TouchEvent;
