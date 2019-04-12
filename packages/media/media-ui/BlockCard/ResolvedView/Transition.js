import * as tslib_1 from "tslib";
import * as React from 'react';
import ComponentTransition from 'react-transition-group/Transition';
var styles = {
    enter: {
        fade: {
            entering: {
                opacity: '0',
            },
            entered: {
                opacity: '1',
            },
        },
        'slide-up': {
            entering: {
                transform: 'translate(0, 100%)',
            },
            entered: {
                transform: 'translate(0, 0)',
            },
        },
    },
    exit: {
        fade: {
            exiting: {
                opacity: '1',
            },
            exited: {
                opacity: '0',
            },
        },
        'slide-down': {
            exiting: {
                transform: 'translate(0, 0)',
            },
            exited: {
                transform: 'translate(0, 100%)',
            },
        },
    },
};
function getStyle(type, name, state) {
    return (styles && styles[type] && styles[type][name] && styles[type][name][state]);
}
var Transition = /** @class */ (function (_super) {
    tslib_1.__extends(Transition, _super);
    function Transition(props) {
        var _this = _super.call(this, props) || this;
        _this.handleExited = function () {
            var _a = _this.props, timeout = _a.timeout, children = _a.children;
            window.setTimeout(function () {
                return _this.setState({
                    visible: false,
                    children: children,
                });
            }, timeout); // FIXME: hmm not sure why we have to wait - it should have already finished
        };
        _this.state = {
            visible: props.children !== null,
            children: props.children,
        };
        return _this;
    }
    Transition.prototype.componentWillReceiveProps = function (nextProps) {
        var nextChildren = nextProps.children;
        var prevChildren = this.props.children;
        // when exiting, show the old element until the transition is finished - otherwise the Alert changes mid-transition
        if (nextChildren !== prevChildren) {
            if (nextChildren === null) {
                this.setState({
                    visible: false,
                });
            }
            else {
                this.setState({
                    visible: true,
                    children: nextChildren,
                });
            }
        }
    };
    Transition.prototype.getStyle = function (status) {
        var _a = this.props, _b = _a.enter, enter = _b === void 0 ? [] : _b, _c = _a.exit, exit = _c === void 0 ? [] : _c, timeout = _a.timeout;
        if (status === 'entering') {
            return enter.reduce(function (accum, name) { return (tslib_1.__assign({}, accum, getStyle('enter', name, 'entering'))); }, {});
        }
        if (status === 'entered') {
            return tslib_1.__assign({}, enter.reduce(function (accum, name) { return (tslib_1.__assign({}, accum, getStyle('enter', name, 'entering'))); }, {}), enter.reduce(function (accum, name) { return (tslib_1.__assign({}, accum, getStyle('enter', name, 'entered'))); }, {}), { transition: "all " + timeout + "ms ease-in-out" });
        }
        if (status === 'exiting') {
            return tslib_1.__assign({}, exit.reduce(function (accum, name) { return (tslib_1.__assign({}, accum, getStyle('exit', name, 'exiting'))); }, {}));
        }
        if (status === 'exited') {
            return tslib_1.__assign({}, exit.reduce(function (accum, name) { return (tslib_1.__assign({}, accum, getStyle('exit', name, 'exiting'))); }, {}), exit.reduce(function (accum, name) { return (tslib_1.__assign({}, accum, getStyle('exit', name, 'exited'))); }, {}), { transition: "all " + timeout + "ms ease-in-out" });
        }
        return {};
    };
    Transition.prototype.render = function () {
        var _this = this;
        var timeout = this.props.timeout;
        var _a = this.state, visible = _a.visible, children = _a.children;
        return (React.createElement(ComponentTransition, { appear: true, enter: true, exit: true, in: visible, timeout: timeout, onExited: this.handleExited }, function (status) {
            if (children) {
                return React.cloneElement(children, {
                    style: _this.getStyle(status),
                });
            }
            else {
                return children;
            }
        }));
    };
    return Transition;
}(React.Component));
export default Transition;
//# sourceMappingURL=Transition.js.map