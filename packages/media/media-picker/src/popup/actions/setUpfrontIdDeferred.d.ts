export declare const SET_UPFRONT_ID_DEFERRED = "SET_UPFRONT_ID_DEFERRED";
export interface SetUpfrontIdDeferred {
    readonly type: 'SET_UPFRONT_ID_DEFERRED';
    readonly id: string;
    readonly resolver: (id: string) => void;
    readonly rejecter: Function;
}
export declare function setUpfrontIdDeferred(id: string, resolver: (id: string) => void, rejecter: Function): SetUpfrontIdDeferred;
