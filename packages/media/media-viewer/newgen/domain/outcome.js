var Outcome = /** @class */ (function () {
    function Outcome(state) {
        this.state = state;
    }
    Outcome.successful = function (data) {
        return new Outcome({ status: 'SUCCESSFUL', data: data });
    };
    Outcome.pending = function () {
        return new Outcome({ status: 'PENDING' });
    };
    Outcome.failed = function (err) {
        return new Outcome({ status: 'FAILED', err: err });
    };
    Object.defineProperty(Outcome.prototype, "status", {
        get: function () {
            return this.state.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Outcome.prototype, "data", {
        get: function () {
            if (this.state.status === 'SUCCESSFUL') {
                return this.state.data;
            }
            else {
                return;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Outcome.prototype, "err", {
        get: function () {
            if (this.state.status === 'FAILED') {
                return this.state.err;
            }
            else {
                return;
            }
        },
        enumerable: true,
        configurable: true
    });
    Outcome.prototype.whenSuccessful = function (successful) {
        if (this.state.status === 'SUCCESSFUL') {
            successful(this.state.data);
        }
    };
    Outcome.prototype.whenPending = function (pending) {
        if (this.state.status === 'PENDING') {
            pending();
        }
    };
    Outcome.prototype.whenFailed = function (failed) {
        if (this.state.status === 'FAILED') {
            failed(this.state.err);
        }
    };
    Outcome.prototype.match = function (_a) {
        var successful = _a.successful, pending = _a.pending, failed = _a.failed;
        switch (this.state.status) {
            case 'SUCCESSFUL':
                return successful(this.state.data);
            case 'PENDING':
                return pending();
            case 'FAILED':
                return failed(this.state.err);
        }
    };
    Outcome.prototype.mapSuccessful = function (map) {
        if (this.state.status === 'SUCCESSFUL') {
            return Outcome.successful(map(this.state.data));
        }
        else {
            return new Outcome(this.state);
        }
    };
    Outcome.prototype.mapFailed = function (map) {
        if (this.state.status === 'FAILED') {
            return Outcome.failed(map(this.state.err));
        }
        else {
            return new Outcome(this.state);
        }
    };
    return Outcome;
}());
export { Outcome };
//# sourceMappingURL=outcome.js.map