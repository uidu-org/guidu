import { EventEmitter2 } from 'eventemitter2';
import { isRemoteUploadStartData, isRemoteUploadProgressData, isRemoteUploadEndData, isRemoteUploadErrorData, isNotifyMetadata, } from '../wsMessageData';
var RemoteUploadActivity = /** @class */ (function () {
    function RemoteUploadActivity(uploadId, dispatchEvent) {
        this.uploadId = uploadId;
        this.dispatchEvent = dispatchEvent;
        this.eventEmitter = new EventEmitter2();
    }
    RemoteUploadActivity.prototype.processWebSocketData = function (data) {
        if (!this.shouldProcessWsData(data)) {
            return;
        }
        if (isRemoteUploadStartData(data)) {
            this.dispatchEvent('RemoteUploadStart', {
                uploadId: data.uploadId,
            });
            this.notifyActivityStarted();
        }
        else if (isRemoteUploadProgressData(data)) {
            this.dispatchEvent('RemoteUploadProgress', {
                uploadId: data.uploadId,
                bytes: data.currentAmount,
                fileSize: data.totalAmount,
            });
        }
        else if (isRemoteUploadEndData(data)) {
            this.dispatchEvent('RemoteUploadEnd', {
                fileId: data.fileId,
                uploadId: data.uploadId,
            });
            this.notifyActivityCompleted();
        }
        else if (isRemoteUploadErrorData(data)) {
            this.dispatchEvent('RemoteUploadFail', {
                // First try to use alternative response shape
                // Will be removed after backend unifies response schema
                uploadId: (data.data && data.data.uploadId) || data.uploadId,
                description: (data.data && data.data.reason) || data.reason,
            });
            this.notifyActivityCompleted();
        }
        else if (isNotifyMetadata(data)) {
            this.dispatchEvent('NotifyMetadata', {
                uploadId: data.uploadId,
                metadata: data.metadata,
            });
        }
    };
    RemoteUploadActivity.prototype.connectionLost = function () {
        if (this.uploadId) {
            this.dispatchEvent('RemoteUploadFail', {
                uploadId: this.uploadId,
                description: 'Websocket connection lost',
            });
        }
    };
    RemoteUploadActivity.prototype.on = function (event, handler) {
        this.eventEmitter.on(event, handler);
    };
    RemoteUploadActivity.prototype.off = function (event, handler) {
        this.eventEmitter.off(event, handler);
    };
    RemoteUploadActivity.prototype.shouldProcessWsData = function (data) {
        var shouldProcess = !!(data.uploadId &&
            this.uploadId &&
            data.uploadId === this.uploadId);
        // Try to use alternative response shape
        // Will be removed after backend unifies response schema
        var shouldProcessAlt = !!(data.data &&
            data.data.uploadId &&
            this.uploadId &&
            data.data.uploadId === this.uploadId);
        return shouldProcess || shouldProcessAlt;
    };
    RemoteUploadActivity.prototype.notifyActivityStarted = function () {
        this.eventEmitter.emit('Started', this);
    };
    RemoteUploadActivity.prototype.notifyActivityCompleted = function () {
        this.eventEmitter.emit('Completed', this);
    };
    return RemoteUploadActivity;
}());
export { RemoteUploadActivity };
//# sourceMappingURL=remoteUploadActivity.js.map