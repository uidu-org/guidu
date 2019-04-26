import * as Core from './binaries/mediaEditor';
export declare type TimerTickHandler = (id: number) => void;
export declare type TimerCallback = () => void;
export declare type TimerHandle = number;
export declare type TimerStarter = (callback: TimerCallback, msecInterval: number) => TimerHandle;
export declare type TimerStopper = (handle: TimerHandle) => void;
export declare class TimerFactory implements Core.TimerFactoryInterop {
    private onTick;
    private timerStarter?;
    private timerStopper?;
    private lastId;
    private activeTimers;
    constructor(onTick: TimerTickHandler, timerStarter?: TimerStarter, timerStopper?: TimerStopper);
    unload(): void;
    createTimer(): number;
    startTimer(id: number, msecInterval: number): void;
    stopTimer(id: number): void;
    private unloadTimer;
    private static defaultStarter;
    private static defaultStopper;
}
