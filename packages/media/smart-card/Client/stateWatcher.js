var StateWatch = /** @class */ (function () {
    function StateWatch(getNow) {
        this.getNow = getNow;
        this.entry = null;
        this.subscribers = [];
    }
    StateWatch.prototype.subscribe = function (uuid, fn) {
        if (!this.subscribers.find(function (sub) { return sub.uuid === uuid; })) {
            this.subscribers.push({ uuid: uuid, fn: fn });
        }
        fn([this.entry ? this.entry.state : null, this.hasExpired()]);
        return function () { };
    };
    StateWatch.prototype.invalidate = function () {
        if (this.entry) {
            this.entry.goodTill = this.getNow() - 1;
        }
        return this;
    };
    StateWatch.prototype.getProp = function (propName) {
        if (this.entry === null) {
            return;
        }
        return this.entry.state[propName];
    };
    StateWatch.prototype.unsubscribe = function (uuid) {
        this.subscribers = this.subscribers.filter(function (rec) { return rec.uuid !== uuid; });
    };
    StateWatch.prototype.hasExpired = function () {
        if (this.entry === null) {
            return true;
        }
        return this.entry.goodTill < this.getNow();
    };
    StateWatch.prototype.update = function (state, lifespan) {
        this.entry = {
            state: state,
            goodTill: this.getNow() + lifespan,
        };
        this.subscribers.forEach(function (rec) { return rec.fn([state, false]); });
    };
    return StateWatch;
}());
export { StateWatch };
//# sourceMappingURL=stateWatcher.js.map