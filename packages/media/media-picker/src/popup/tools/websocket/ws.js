import * as url from 'url';
import { randomInt } from '../randomInt';
import { mapAuthToQueryParameters } from '../../domain/auth';
import { objectToQueryString } from '../objectToQueryString';
// Helper function that formats websocket URL based on API URL
export var getWsUrl = function (baseUrl) {
    var urlParams = url.parse(baseUrl);
    var protocol = urlParams.protocol, host = urlParams.host;
    var wsProtocol = protocol === 'http:' ? 'ws:' : 'wss:';
    return wsProtocol + "//" + host + "/picker/ws/";
};
// Wraps WebSocket instance.
// The constructor can throw an error.
//
// You should call teardown() when you're done with the object of this class.
//
// Internally pings the websocket periodically. If the connection is lost, calls onConnectionLost.
// In this case you don't have to call teardown(), however calling teardown() twice doesn't cause an error.
var Ws = /** @class */ (function () {
    function Ws(auth, onDataReceived, onConnectionLost) {
        var _this = this;
        this.onDataReceived = onDataReceived;
        this.onConnectionLost = onConnectionLost;
        this.teardown = function () {
            window.clearTimeout(_this.pingTimeoutId);
            _this.ws.close();
        };
        this.send = function (data) {
            var ws = _this.ws;
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(data));
            }
            else if (ws.readyState === ws.CONNECTING) {
                var listener_1 = function () {
                    ws.removeEventListener('open', listener_1);
                    ws.send(JSON.stringify(data));
                };
                ws.addEventListener('open', listener_1);
            }
        };
        this.schedulePing = function () {
            // Intervals for ping in milliseconds
            var minInterval = 25 * 1000;
            var maxInterval = 35 * 1000;
            var interval = randomInt(minInterval, maxInterval);
            window.clearTimeout(_this.pingTimeoutId);
            _this.pingTimeoutId = window.setTimeout(_this.ping, interval);
        };
        this.ping = function () {
            if (_this.isWebSocketClosed()) {
                _this.teardown();
                _this.onConnectionLost();
                return;
            }
            _this.sendHeartBeat();
            _this.schedulePing();
        };
        this.isWebSocketClosed = function () {
            return _this.ws.readyState === _this.ws.CLOSED;
        };
        this.sendHeartBeat = function () {
            if (_this.ws.readyState === _this.ws.OPEN) {
                _this.ws.send('');
            }
        };
        this.setHandler = function () {
            _this.ws.onmessage = function (message) {
                var resp = JSON.parse(message.data);
                _this.onDataReceived(resp);
            };
        };
        var wsUrl = getWsUrl(auth.baseUrl);
        // WebSocket throws an exception SECURITY_ERR if the port is blocked.
        // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        var authParams = mapAuthToQueryParameters(auth);
        this.ws = new WebSocket(wsUrl + "?" + objectToQueryString(authParams));
        this.setHandler();
        this.schedulePing();
    }
    return Ws;
}());
export { Ws };
//# sourceMappingURL=ws.js.map