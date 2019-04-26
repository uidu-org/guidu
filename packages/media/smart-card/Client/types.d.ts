export declare type GetNowTimeFn = () => number;
export interface AuthService {
    id: string;
    name: string;
    startAuthUrl: string;
}
export declare type PendingState = {
    status: 'pending';
};
export declare type ResolvingState = {
    status: 'resolving';
};
export declare type ErroredState = {
    definitionId: undefined;
    status: 'errored';
};
export declare type NotFoundState = {
    status: 'not-found';
};
export declare type DefinedStatus = 'resolved' | 'unauthorized' | 'forbidden';
export declare type DefinedState = {
    status: DefinedStatus;
    definitionId: string;
    services: AuthService[];
    data?: {
        [name: string]: any;
    };
};
export declare type ObjectState = PendingState | ResolvingState | ErroredState | NotFoundState | DefinedState;
export declare type ObjectStatus = Pick<ObjectState, 'status'>['status'];
export declare type CardUpdateCallback<T> = (state: [T | null, boolean]) => void;
