import { CardUpdateCallback, GetNowTimeFn } from './types';
declare type StateWatchEntry<T> = {
    state: T;
    goodTill: number;
} | null;
export declare class StateWatch<T> {
    private getNow;
    entry: StateWatchEntry<T>;
    private subscribers;
    constructor(getNow: GetNowTimeFn);
    subscribe(uuid: string, fn: CardUpdateCallback<T>): () => void;
    invalidate(): StateWatch<T>;
    getProp<P extends T>(propName: keyof P): P[typeof propName] | undefined;
    unsubscribe(uuid: string): void;
    hasExpired(): boolean;
    update(state: T, lifespan: number): void;
}
export {};
