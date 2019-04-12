export declare type AbortFunction = () => void;
export declare class UploadController {
    abortFunction?: AbortFunction;
    constructor();
    setAbort(abortFunction: AbortFunction): void;
    abort(): void;
}
