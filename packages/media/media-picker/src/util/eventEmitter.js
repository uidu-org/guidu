import { EventEmitter2 } from 'eventemitter2';
var GenericEventEmitter = /** @class */ (function () {
    function GenericEventEmitter() {
        this.emitter = new EventEmitter2({
            wildcard: true,
        });
    }
    GenericEventEmitter.prototype.once = function (event, listener) {
        this.emitter.once(event, listener);
    };
    GenericEventEmitter.prototype.on = function (event, listener) {
        this.emitter.on(event, listener);
    };
    GenericEventEmitter.prototype.onAny = function (listener) {
        this.emitter.onAny(listener);
    };
    GenericEventEmitter.prototype.addListener = function (event, listener) {
        this.emitter.addListener(event, listener);
    };
    GenericEventEmitter.prototype.off = function (event, listener) {
        this.emitter.off(event, listener);
    };
    GenericEventEmitter.prototype.removeListener = function (event, handler) {
        this.emitter.removeListener(event, handler);
    };
    GenericEventEmitter.prototype.removeAllListeners = function (event) {
        // We want to explicitly call removeAllListeners without any argument if event is undefined, otherwise will EventEmitter fail
        if (event === undefined) {
            this.emitter.removeAllListeners();
        }
        else {
            this.emitter.removeAllListeners(event);
        }
    };
    GenericEventEmitter.prototype.emit = function (event, payload) {
        return this.emitter.emit(event, payload);
    };
    return GenericEventEmitter;
}());
export { GenericEventEmitter };
//# sourceMappingURL=eventEmitter.js.map