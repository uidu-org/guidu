import { WsMessageData } from './wsMessageData';
export interface WsActivityEvents {
    Started: (activity: WsActivity) => void;
    Completed: (activity: WsActivity) => void;
}
export interface WsActivity {
    processWebSocketData(data: WsMessageData): void;
    connectionLost(): void;
    on<T extends keyof WsActivityEvents>(event: T, handler: WsActivityEvents[T]): void;
    off<T extends keyof WsActivityEvents>(event: T, handler: WsActivityEvents[T]): void;
}
