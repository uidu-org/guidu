import { Auth } from '@uidu/media-core';
import { ConnectionLostHandler, WebsocketDataReceivedHandler } from './ws';
export declare class WsConnection {
    private readonly auth;
    private readonly onDataReceived;
    private readonly onConnectionLost;
    private retriesRemaining;
    private retryTimeoutId?;
    private idleTimeoutId?;
    private ws?;
    constructor(auth: Auth, onDataReceived: WebsocketDataReceivedHandler, onConnectionLost: ConnectionLostHandler);
    teardown(): void;
    send(data: any): void;
    private openWs;
    private wsDataReceived;
    private resetIdleTimeout;
    private onIdle;
}
