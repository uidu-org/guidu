import { Auth } from '@uidu/media-core';
import { WsMessageData } from './wsMessageData';
export declare type ConnectionLostHandler = () => void;
export declare type WebsocketDataReceivedHandler = (data: WsMessageData) => void;
export declare const getWsUrl: (baseUrl: string) => string;
export declare class Ws {
    private onDataReceived;
    private onConnectionLost;
    private readonly ws;
    private pingTimeoutId?;
    constructor(auth: Auth, onDataReceived: WebsocketDataReceivedHandler, onConnectionLost: ConnectionLostHandler);
    teardown: () => void;
    send: (data: any) => void;
    private schedulePing;
    private ping;
    private isWebSocketClosed;
    private sendHeartBeat;
    private setHandler;
}
