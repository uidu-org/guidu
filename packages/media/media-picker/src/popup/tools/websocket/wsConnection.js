import { Ws } from './ws';
// Contains retry logic to establish the websocket connection
//
// If no data was received within 3 minutes, the connection is reported as lost.
var WsConnection = /** @class */ (function () {
    function WsConnection(auth, onDataReceived, onConnectionLost) {
        var _this = this;
        this.auth = auth;
        this.onDataReceived = onDataReceived;
        this.onConnectionLost = onConnectionLost;
        this.retriesRemaining = 10;
        this.openWs = function () {
            var timeout = 1000; // msec
            try {
                window.clearTimeout(_this.retryTimeoutId);
                _this.ws = new Ws(_this.auth, _this.wsDataReceived, _this.onConnectionLost);
                _this.resetIdleTimeout();
            }
            catch (error) {
                // Could not create a web socket
                --_this.retriesRemaining;
                if (_this.retriesRemaining > 0) {
                    // Retry after a timeout
                    _this.retryTimeoutId = window.setTimeout(_this.openWs, timeout);
                }
                else {
                    // No more retries
                    _this.teardown();
                    _this.onConnectionLost();
                }
            }
        };
        this.wsDataReceived = function (data) {
            _this.resetIdleTimeout();
            _this.onDataReceived(data);
        };
        this.resetIdleTimeout = function () {
            // if we don't receive a message from the WebSocket after 3 minutes we close it
            var idleTimeout = 3 * 60 * 1000;
            window.clearTimeout(_this.idleTimeoutId);
            _this.idleTimeoutId = window.setTimeout(_this.onIdle, idleTimeout);
        };
        this.onIdle = function () {
            window.clearTimeout(_this.idleTimeoutId);
            _this.onConnectionLost();
        };
        this.openWs();
    }
    WsConnection.prototype.teardown = function () {
        if (this.ws) {
            this.ws.teardown();
            this.ws = undefined;
        }
        window.clearTimeout(this.retryTimeoutId);
        window.clearTimeout(this.idleTimeoutId);
        this.retriesRemaining = 0;
    };
    WsConnection.prototype.send = function (data) {
        if (!this.ws) {
            throw new Error('WebSocket connection has been closed');
        }
        this.ws.send(data);
    };
    return WsConnection;
}());
export { WsConnection };
//# sourceMappingURL=wsConnection.js.map