// Active timer that starts when constructed. To stop it call unload()
var ActiveTimer = /** @class */ (function () {
    function ActiveTimer(callback, msecInterval, starter, stopper) {
        this.stopper = stopper;
        this.handle = starter(callback, msecInterval);
    }
    ActiveTimer.prototype.unload = function () {
        if (this.handle !== 0) {
            this.stopper(this.handle);
            this.handle = 0;
        }
    };
    return ActiveTimer;
}());
// Responsible for providing timers for the core.
//
// The core creates a timer with createTimer() and receives the id.
// Then it may call startTimer() and stopTimer() on the same id many times.
var TimerFactory = /** @class */ (function () {
    function TimerFactory(onTick, timerStarter, timerStopper) {
        this.onTick = onTick;
        this.timerStarter = timerStarter;
        this.timerStopper = timerStopper;
        this.lastId = 0;
        this.activeTimers = {};
    }
    TimerFactory.prototype.unload = function () {
        for (var id in this.activeTimers) {
            this.activeTimers[id].unload();
        }
    };
    TimerFactory.prototype.createTimer = function () {
        return this.lastId++;
    };
    TimerFactory.prototype.startTimer = function (id, msecInterval) {
        var _this = this;
        // If the timer with this id already running, we must stop it
        this.unloadTimer(id);
        this.activeTimers[id] = new ActiveTimer(function () {
            _this.onTick(id);
        }, msecInterval, this.timerStarter || TimerFactory.defaultStarter, this.timerStopper || TimerFactory.defaultStopper);
    };
    TimerFactory.prototype.stopTimer = function (id) {
        this.unloadTimer(id);
        delete this.activeTimers[id];
    };
    TimerFactory.prototype.unloadTimer = function (id) {
        var current = this.activeTimers[id];
        if (current) {
            current.unload();
        }
    };
    TimerFactory.defaultStarter = function (callback, msecInterval) {
        return window.setInterval(callback, msecInterval);
    };
    TimerFactory.defaultStopper = function (handle) {
        clearInterval(handle);
    };
    return TimerFactory;
}());
export { TimerFactory };
//# sourceMappingURL=timerFactory.js.map