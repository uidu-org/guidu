import { WsActivity, WsActivityEvents } from '../wsActivity';
import { WsUploadEvents } from './wsUploadEvents';
import { WsUploadMessageData } from '../wsMessageData';
export declare type DispatchUploadEvent<T extends keyof WsUploadEvents> = (event: T, payload: WsUploadEvents[T]) => void;
export declare class RemoteUploadActivity implements WsActivity {
    private readonly uploadId;
    private readonly dispatchEvent;
    private readonly eventEmitter;
    constructor(uploadId: string, dispatchEvent: DispatchUploadEvent<keyof WsUploadEvents>);
    processWebSocketData(data: WsUploadMessageData): void;
    connectionLost(): void;
    on<T extends keyof WsActivityEvents>(event: T, handler: WsActivityEvents[T]): void;
    off<T extends keyof WsActivityEvents>(event: T, handler: WsActivityEvents[T]): void;
    private shouldProcessWsData;
    private notifyActivityStarted;
    private notifyActivityCompleted;
}
