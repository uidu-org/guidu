import * as tslib_1 from "tslib";
import * as React from 'react';
import Avatar from '@uidu/avatar';
import AvatarGroup from '@uidu/avatar-group';
import Tooltip from '@uidu/tooltip';
import Button from '@uidu/button';
import { ImageIcon } from '../ImageIcon';
import LinkGlyph from '@atlaskit/icon/glyph/link';
import { minWidth, maxWidth } from '../dimensions';
import { ExpandedFrame } from '../ExpandedFrame';
import AlertView from './AlertView';
import { PreviewView } from './PreviewView';
import Widgets from './Widgets';
import { maxAvatarCount, ContentWrapper, LeftWrapper, RightWrapper, Title, Byline, Description, Thumbnail, IconWrapper, UsersWrapper, ActionsWrapper, AlertWrapper, } from './styled';
import Transition from './Transition';
function getActionPendingState(action) {
    return function (state) {
        var _a;
        return ({
            pendingActionsById: tslib_1.__assign({}, state.pendingActionsById, (_a = {}, _a[action.id] = true, _a)),
        });
    };
}
function getActionSuccessState(action, message) {
    return function (state) {
        var _a;
        return ({
            pendingActionsById: tslib_1.__assign({}, state.pendingActionsById, (_a = {}, _a[action.id] = false, _a)),
            alert: message
                ? {
                    type: 'success',
                    text: message,
                }
                : state.alert,
        });
    };
}
function getActionFailureState(action, message) {
    return function (state) {
        var _a;
        return ({
            lastFailedAction: action,
            pendingActionsById: tslib_1.__assign({}, state.pendingActionsById, (_a = {}, _a[action.id] = false, _a)),
            alert: message
                ? {
                    type: 'failure',
                    text: message,
                }
                : state.alert,
        });
    };
}
function clearActionSuccessState() {
    return {
        alert: undefined,
    };
}
function clearActionFailureState() {
    return {
        lastFailedAction: undefined,
        alert: undefined,
    };
}
var BlockCardResolvedView = /** @class */ (function (_super) {
    tslib_1.__extends(BlockCardResolvedView, _super);
    function BlockCardResolvedView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            pendingActionsById: {},
        };
        /* prevent the parent link handler from opening a URL when clicked */
        _this.handleAvatarClick = function (_a) {
            var event = _a.event;
            event.preventDefault();
            event.stopPropagation();
        };
        /* prevent the parent link handler from opening a URL when clicked */
        /* NOTE: this prevents the dropdown from showing with more items */
        _this.handleMoreAvatarsClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        _this.createActionHandler = function (action) {
            return function (event) {
                /* prevent the parent handler from opening a URL when clicked */
                event.preventDefault();
                event.stopPropagation();
                // prevent the next alert from being cleared by any previous success alerts that haven't already been cleared
                if (_this.alertTimeout) {
                    clearTimeout(_this.alertTimeout);
                }
                // handle the action
                action.handler(_this.getActionHandlerCallbacks(action));
            };
        };
        _this.handleActionRetry = function () {
            var lastFailedAction = _this.state.lastFailedAction;
            if (lastFailedAction) {
                lastFailedAction.handler(_this.getActionHandlerCallbacks(lastFailedAction));
            }
        };
        _this.handleActionDismis = function () {
            _this.setState(clearActionFailureState());
        };
        return _this;
    }
    BlockCardResolvedView.prototype.getActionHandlerCallbacks = function (action) {
        var _this = this;
        return {
            pending: function () { return _this.setState(getActionPendingState(action)); },
            success: function (message) {
                _this.setState(getActionSuccessState(action, message), function () {
                    // hide the alert after 2s
                    _this.alertTimeout = window.setTimeout(function () { return _this.setState(clearActionSuccessState()); }, 2000);
                });
            },
            failure: function () {
                return _this.setState(getActionFailureState(action, 'Something went wrong.'));
            },
        };
    };
    BlockCardResolvedView.prototype.componentWillUnmount = function () {
        // prevent the alert from being cleared and unmounted
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }
    };
    BlockCardResolvedView.prototype.renderIcon = function () {
        var icon = this.props.icon;
        if (!icon) {
            return null;
        }
        if (icon.url) {
            // TODO: handle if there is an error loading the image -> show the placeholder
            return (React.createElement(IconWrapper, null,
                React.createElement(Tooltip, { content: icon.tooltip },
                    React.createElement(ImageIcon, { src: icon.url, size: 24 }))));
        }
        return icon;
    };
    BlockCardResolvedView.prototype.renderThumbnail = function () {
        var thumbnail = this.props.thumbnail;
        if (!thumbnail) {
            return null;
        }
        // TODO: handle if there is an error loading the image -> show the placeholder
        return React.createElement(Thumbnail, { src: thumbnail });
    };
    BlockCardResolvedView.prototype.renderUser = function () {
        var user = this.props.user;
        if (!user) {
            return null;
        }
        return React.createElement(Avatar, { size: "medium", src: user.icon, name: user.name });
    };
    BlockCardResolvedView.prototype.renderUsers = function () {
        var _a = this.props.users, users = _a === void 0 ? [] : _a;
        if (users.length === 0) {
            return null;
        }
        return (React.createElement(UsersWrapper, null,
            React.createElement(AvatarGroup, { maxCount: maxAvatarCount, appearance: "stack", size: "small", data: users.map(function (user) { return ({
                    name: user.name,
                    src: user.icon,
                    size: 'small',
                }); }), onAvatarClick: this.handleAvatarClick, onMoreClick: this.handleMoreAvatarsClick })));
    };
    BlockCardResolvedView.prototype.renderActions = function () {
        var _this = this;
        var _a = this.props.actions, actions = _a === void 0 ? [] : _a;
        var _b = this.state, alert = _b.alert, pendingActionsById = _b.pendingActionsById;
        if (!actions.length) {
            return null;
        }
        var isAnyActionFailed = alert && alert.type === 'failure';
        return (React.createElement(ActionsWrapper, null, actions.slice(0, 3).map(function (action) {
            var id = action.id, text = action.text;
            var isPending = pendingActionsById[id];
            return (React.createElement(Button, { key: id, spacing: "compact", isDisabled: isPending || isAnyActionFailed, isLoading: isPending, onClick: _this.createActionHandler(action) }, text));
        })));
    };
    BlockCardResolvedView.prototype.renderAlert = function () {
        var alert = this.state.alert;
        return (React.createElement(AlertWrapper, null,
            React.createElement(Transition, { enter: ['fade', 'slide-up'], exit: ['fade', 'slide-down'], timeout: 300 }, alert ? (React.createElement(AlertView, { type: alert.type === 'success' ? 'success' : 'failure', text: alert.text, onRetry: this.handleActionRetry, onDismis: this.handleActionDismis })) : null)));
    };
    BlockCardResolvedView.prototype.renderWithToolTip = function (Elem, model) {
        if (model.tooltip) {
            return (React.createElement(Tooltip, { content: model.tooltip },
                React.createElement(Elem, null, model.text)));
        }
        else {
            return React.createElement(Elem, null, model.text);
        }
    };
    BlockCardResolvedView.prototype.render = function () {
        var _a = this.props, link = _a.link, context = _a.context, title = _a.title, byline = _a.byline, description = _a.description, icon = _a.icon, user = _a.user, preview = _a.preview, details = _a.details, onClick = _a.onClick, isSelected = _a.isSelected;
        return (React.createElement(ExpandedFrame, { minWidth: minWidth, maxWidth: maxWidth, isSelected: isSelected, href: link, icon: React.createElement(ImageIcon, { src: context && context.icon, default: React.createElement(LinkGlyph, { label: "icon", size: "small" }) }), text: context && context.text, onClick: onClick },
            preview && React.createElement(PreviewView, { url: preview }),
            React.createElement(ContentWrapper, null,
                this.renderAlert(),
                (icon || user) && (React.createElement(LeftWrapper, null,
                    this.renderIcon(),
                    !icon && this.renderUser())),
                React.createElement(RightWrapper, null,
                    this.renderThumbnail(),
                    title && title.text && this.renderWithToolTip(Title, title),
                    !byline ? null : !byline.text ? (React.createElement(Byline, null, byline)) : (this.renderWithToolTip(Byline, byline)),
                    description &&
                        description.text &&
                        this.renderWithToolTip(Description, description),
                    React.createElement(Widgets, { details: details }),
                    this.renderUsers(),
                    this.renderActions()))));
    };
    return BlockCardResolvedView;
}(React.Component));
export { BlockCardResolvedView };
//# sourceMappingURL=index.js.map