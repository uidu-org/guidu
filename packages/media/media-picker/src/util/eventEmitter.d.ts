export declare type EventPayloadMap<P = any> = {
    readonly [event: string]: P;
};
export declare type EventPayloadListener<M extends EventPayloadMap<P>, E extends keyof M, P = any> = (payload: M[E]) => void;
export interface EventEmitter<M extends EventPayloadMap<P>, P = any> {
    once<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    on<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    onAny<E extends keyof M>(listener: (event: E, payload: M[E]) => void): void;
    addListener<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    off<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    removeListener<E extends keyof M>(event: E, handler: EventPayloadListener<M, E>): void;
    removeAllListeners<E extends keyof M>(event?: E): void;
    emit<E extends keyof M>(event: E, payload: M[E]): boolean;
}
export declare class GenericEventEmitter<M extends EventPayloadMap<P>, P = any> implements EventEmitter<M> {
    private readonly emitter;
    once<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    on<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    onAny<E extends keyof M>(listener: (event: E, payload: M[E]) => void): void;
    addListener<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    off<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void;
    removeListener<E extends keyof M>(event: E, handler: EventPayloadListener<M, E>): void;
    removeAllListeners<E extends keyof M>(event?: E): void;
    emit<E extends keyof M>(event: E, payload: M[E]): boolean;
}
