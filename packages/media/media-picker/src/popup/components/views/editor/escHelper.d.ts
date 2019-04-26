export declare type EscHandler = () => void;
/**
 * Subscribes to the window 'keydown' event, calls escHandler when ESC is pressed.
 * Call unload() to unsubscribe from the window event.
 */
export declare class EscHelper {
    private readonly escHandler;
    private readonly keyDownListener;
    constructor(escHandler: EscHandler);
    teardown(): void;
    private onKeyDown;
}
