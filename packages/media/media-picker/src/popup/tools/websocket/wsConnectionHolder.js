import { WsConnection } from './wsConnection';
// Responsible for creating a websocket connection when necessary and holding it until all activities are finished
var WsConnectionHolder = /** @class */ (function () {
    function WsConnectionHolder(auth) {
        var _this = this;
        this.auth = auth;
        this.activities = [];
        this.onActivityCompleted = function (activity) {
            var index = _this.activities.indexOf(activity);
            if (index !== -1) {
                _this.activities.splice(index, 1);
            }
            // Where we don't have any activities left, we should close the connection
            if (_this.activities.length === 0 && _this.wsConnection) {
                _this.closeConnection();
            }
        };
        this.onWebSocketDataReceived = function (data) {
            _this.activities.forEach(function (activity) {
                activity.processWebSocketData(data);
            });
        };
        this.onConnectionLost = function () {
            _this.closeConnection();
        };
    }
    WsConnectionHolder.prototype.openConnection = function (activity) {
        activity.on('Completed', this.onActivityCompleted);
        this.activities.push(activity);
        if (!this.wsConnection) {
            this.wsConnection = new WsConnection(this.auth, this.onWebSocketDataReceived, this.onConnectionLost);
        }
    };
    WsConnectionHolder.prototype.send = function (data) {
        if (!this.wsConnection) {
            throw new Error('WebSocket connection has been closed');
        }
        this.wsConnection.send(data);
    };
    WsConnectionHolder.prototype.closeConnection = function () {
        var _this = this;
        this.activities.forEach(function (activity) {
            activity.off('Completed', _this.onActivityCompleted);
            activity.connectionLost();
        });
        this.activities = [];
        if (this.wsConnection) {
            this.wsConnection.teardown();
            this.wsConnection = undefined;
        }
    };
    return WsConnectionHolder;
}());
export { WsConnectionHolder };
//# sourceMappingURL=wsConnectionHolder.js.map