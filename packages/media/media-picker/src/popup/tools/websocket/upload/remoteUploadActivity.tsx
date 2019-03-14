import { EventEmitter2 } from 'eventemitter2';
import { WsActivity, WsActivityEvents } from '../wsActivity';
import { WsUploadEvents } from './wsUploadEvents';
import {
  WsUploadMessageData,
  isRemoteUploadStartData,
  isRemoteUploadProgressData,
  isRemoteUploadEndData,
  isRemoteUploadErrorData,
  isNotifyMetadata,
} from '../wsMessageData';

export type DispatchUploadEvent<T extends keyof WsUploadEvents> = (
  event: T,
  payload: WsUploadEvents[T],
) => void;

export class RemoteUploadActivity implements WsActivity {
  private readonly eventEmitter = new EventEmitter2();

  constructor(
    private readonly uploadId: string,
    private readonly dispatchEvent: DispatchUploadEvent<keyof WsUploadEvents>,
  ) {}

  processWebSocketData(data: WsUploadMessageData): void {
    if (!this.shouldProcessWsData(data)) {
      return;
    }

    if (isRemoteUploadStartData(data)) {
      this.dispatchEvent('RemoteUploadStart', {
        uploadId: data.uploadId,
      });
      this.notifyActivityStarted();
    } else if (isRemoteUploadProgressData(data)) {
      this.dispatchEvent('RemoteUploadProgress', {
        uploadId: data.uploadId,
        bytes: data.currentAmount,
        fileSize: data.totalAmount,
      });
    } else if (isRemoteUploadEndData(data)) {
      this.dispatchEvent('RemoteUploadEnd', {
        fileId: data.fileId,
        uploadId: data.uploadId,
      });
      this.notifyActivityCompleted();
    } else if (isRemoteUploadErrorData(data)) {
      this.dispatchEvent('RemoteUploadFail', {
        // First try to use alternative response shape
        // Will be removed after backend unifies response schema
        uploadId: (data.data && data.data.uploadId) || data.uploadId,
        description: (data.data && data.data.reason) || data.reason,
      });
      this.notifyActivityCompleted();
    } else if (isNotifyMetadata(data)) {
      this.dispatchEvent('NotifyMetadata', {
        uploadId: data.uploadId,
        metadata: data.metadata,
      });
    }
  }

  connectionLost(): void {
    if (this.uploadId) {
      this.dispatchEvent('RemoteUploadFail', {
        uploadId: this.uploadId,
        description: 'Websocket connection lost',
      });
    }
  }

  on<T extends keyof WsActivityEvents>(
    event: T,
    handler: WsActivityEvents[T],
  ): void {
    this.eventEmitter.on(event, handler);
  }

  off<T extends keyof WsActivityEvents>(
    event: T,
    handler: WsActivityEvents[T],
  ): void {
    this.eventEmitter.off(event, handler);
  }

  private shouldProcessWsData(data: WsUploadMessageData): boolean {
    const shouldProcess = !!(
      data.uploadId &&
      this.uploadId &&
      data.uploadId === this.uploadId
    );
    // Try to use alternative response shape
    // Will be removed after backend unifies response schema
    const shouldProcessAlt = !!(
      data.data &&
      data.data.uploadId &&
      this.uploadId &&
      data.data.uploadId === this.uploadId
    );

    return shouldProcess || shouldProcessAlt;
  }

  private notifyActivityStarted(): void {
    this.eventEmitter.emit('Started', this);
  }

  private notifyActivityCompleted(): void {
    this.eventEmitter.emit('Completed', this);
  }
}
