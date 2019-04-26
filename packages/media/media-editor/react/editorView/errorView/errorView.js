import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { messages } from '@uidu/media-ui';
import { injectIntl } from 'react-intl';
import { ErrorPopup, ErrorIconWrapper, ErrorMessage, ErrorHint, ErrorButton, } from './styles';
import { errorIcon } from './icons';
import { EditorContainer } from '../styles';
var ErrorView = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorView, _super);
    function ErrorView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorView.prototype.render = function () {
        return (React.createElement(EditorContainer, null,
            React.createElement(ErrorPopup, null,
                React.createElement(ErrorIconWrapper, null, errorIcon),
                React.createElement(ErrorMessage, null, this.props.message),
                React.createElement(ErrorHint, null, this.renderHint()),
                this.renderTryAgainButton(),
                this.renderCancelButton())));
    };
    ErrorView.prototype.renderHint = function () {
        var _a = this.props, onRetry = _a.onRetry, formatMessage = _a.intl.formatMessage;
        if (onRetry) {
            return React.createElement("span", null, formatMessage(messages.error_hint_retry));
        }
        return React.createElement("span", null, formatMessage(messages.error_hint_critical));
    };
    ErrorView.prototype.renderTryAgainButton = function () {
        var _a = this.props, onRetry = _a.onRetry, formatMessage = _a.intl.formatMessage;
        if (onRetry) {
            return (React.createElement(ErrorButton, { appearance: "primary", onClick: onRetry }, formatMessage(messages.try_again)));
        }
        return null;
    };
    ErrorView.prototype.renderCancelButton = function () {
        var _a = this.props, onCancel = _a.onCancel, onRetry = _a.onRetry, formatMessage = _a.intl.formatMessage;
        var message = onRetry ? messages.cancel : messages.close;
        return (React.createElement(ErrorButton, { appearance: "subtle", onClick: onCancel }, formatMessage(message)));
    };
    return ErrorView;
}(Component));
export { ErrorView };
export default injectIntl(ErrorView);
//# sourceMappingURL=errorView.js.map