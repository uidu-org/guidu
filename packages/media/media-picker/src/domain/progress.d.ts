export interface MediaProgress {
    absolute: number;
    portion: number;
    max: number;
    overallTime: number;
    expectedFinishTime: number;
    timeLeft: number;
}
export declare class SmartMediaProgress {
    private size;
    private progress;
    private startTime;
    private measureTime;
    constructor(size: number, progress: number, startTime: number, measureTime: number);
    readonly absolute: number;
    readonly portion: number;
    readonly max: number;
    readonly overallTime: number;
    readonly expectedFinishTime: number;
    readonly timeLeft: number;
    toJSON(): MediaProgress;
    static isValidSize(size: any): boolean;
    static isValidProgress(size: number, progress: number): boolean;
    static isValidStartTime(startTime: number): boolean;
    static isValidMeasureTime(startTime: number, measureTime: number): boolean;
}
