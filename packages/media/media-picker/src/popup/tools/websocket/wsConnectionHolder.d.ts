import { Auth } from '@uidu/media-core';
import { WsActivity } from './wsActivity';
export declare class WsConnectionHolder {
    private readonly auth;
    private wsConnection?;
    private activities;
    constructor(auth: Auth);
    openConnection(activity: WsActivity): void;
    send(data: any): void;
    private onActivityCompleted;
    private onWebSocketDataReceived;
    private onConnectionLost;
    private closeConnection;
}
