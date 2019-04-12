import * as tslib_1 from "tslib";
import * as React from 'react';
import * as debounce from 'lodash.debounce';
import Button from '@uidu/button';
import { Ellipsify } from '../../../ellipsify';
import { Wrapper } from './styled';
var contentWidthWhenCardIs400px = 384;
var AlertView = /** @class */ (function (_super) {
    tslib_1.__extends(AlertView, _super);
    function AlertView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.handleRetry = function (event) {
            var onRetry = _this.props.onRetry;
            if (onRetry) {
                event.preventDefault();
                event.stopPropagation();
                onRetry();
            }
        };
        _this.handleDismis = function (event) {
            var onDismis = _this.props.onDismis;
            if (onDismis) {
                event.preventDefault();
                event.stopPropagation();
                onDismis();
            }
        };
        _this.handleMount = function (el) {
            if (el) {
                _this.el = el;
            }
        };
        _this.handleResize = debounce(function () {
            if (_this.el) {
                _this.setState({ width: _this.el.clientWidth });
            }
        }, 250);
        return _this;
    }
    AlertView.prototype.componentDidMount = function () {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    };
    AlertView.prototype.componentWillUnMount = function () {
        window.removeEventListener('resize', this.handleResize);
    };
    AlertView.prototype.renderContent = function () {
        var _a = this.props, type = _a.type, text = _a.text;
        var width = this.state.width;
        var txt = type === 'success' ? text : 'Something went wrong.';
        if (width && width < contentWidthWhenCardIs400px) {
            return React.createElement(Ellipsify, { text: txt, lines: 2, inline: true });
        }
        else {
            return React.createElement(Ellipsify, { text: txt, lines: 1, inline: true });
        }
    };
    AlertView.prototype.renderRetryAndCancel = function () {
        var type = this.props.type;
        if (type === 'success') {
            return null;
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { appearance: "link", spacing: "none", onClick: this.handleRetry }, "Try again"),
            ' ',
            "or",
            ' ',
            React.createElement(Button, { appearance: "link", spacing: "none", onClick: this.handleDismis }, "cancel"),
            "."));
    };
    AlertView.prototype.render = function () {
        var _a = this.props, type = _a.type, style = _a.style;
        return (React.createElement(Wrapper, { ref: this.handleMount, type: type, style: style },
            this.renderContent(),
            " ",
            this.renderRetryAndCancel()));
    };
    return AlertView;
}(React.Component));
export default AlertView;
//# sourceMappingURL=index.js.map