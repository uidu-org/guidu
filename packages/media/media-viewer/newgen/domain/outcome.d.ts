export declare type PendingState = {
    status: 'PENDING';
};
export declare type SuccessfulState<Data> = {
    status: 'SUCCESSFUL';
    data: Data;
};
export declare type FailedState<Err> = {
    status: 'FAILED';
    err: Err;
};
export declare type State<Data, Err> = PendingState | SuccessfulState<Data> | FailedState<Err>;
export declare class Outcome<Data, Err = Error> {
    private readonly state;
    private constructor();
    static successful<Data, Err>(data: Data): Outcome<Data, Err>;
    static pending<Data, Err>(): Outcome<Data, Err>;
    static failed<Data, Err>(err: Err): Outcome<Data, Err>;
    readonly status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
    readonly data: Data | undefined;
    readonly err: Err | undefined;
    whenSuccessful(successful: (data: Data) => void): void;
    whenPending(pending: () => void): void;
    whenFailed(failed: (err: Err) => void): void;
    match<Result>({ successful, pending, failed, }: {
        successful: (data: Data) => Result;
        pending: () => Result;
        failed: (err: Err) => Result;
    }): Result;
    mapSuccessful<MappedData>(map: (data: Data) => MappedData): Outcome<MappedData, Err>;
    mapFailed<MappedErr>(map: (err: Err) => MappedErr): Outcome<Data, MappedErr>;
}
