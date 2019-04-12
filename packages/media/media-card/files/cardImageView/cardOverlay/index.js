import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as cx from 'classnames';
import TickIcon from '@atlaskit/icon/glyph/check';
import { Ellipsify } from '@uidu/media-ui';
import { messages } from '@uidu/media-ui';
// We dont require things directly from "utils" to avoid circular dependencies
import { FileIcon } from '../../../utils/fileIcon';
import { ErrorIcon } from '../../../utils/errorIcon';
import CardActions from '../../../utils/cardActions';
import { TickBox, Overlay, ErrorLine, LeftColumn, TopRow, BottomRow, RightColumn, ErrorMessage, Retry, TitleWrapper, Subtitle, Metadata, ErrorWrapper, } from './styled';
var CardOverlay = /** @class */ (function (_super) {
    tslib_1.__extends(CardOverlay, _super);
    function CardOverlay(props) {
        var _this = _super.call(this, props) || this;
        _this.onMenuToggle = function (attrs) {
            _this.setState({ isMenuExpanded: attrs.isOpen });
        };
        _this.state = {
            isMenuExpanded: false,
        };
        return _this;
    }
    Object.defineProperty(CardOverlay.prototype, "wrapperClassNames", {
        get: function () {
            var _a = this.props, error = _a.error, noHover = _a.noHover, selectable = _a.selectable, selected = _a.selected, mediaType = _a.mediaType, persistent = _a.persistent;
            var isMenuExpanded = this.state.isMenuExpanded;
            return error
                ? cx('overlay', { error: error, active: isMenuExpanded })
                : cx('overlay', mediaType, {
                    active: isMenuExpanded,
                    selectable: selectable,
                    selected: selected,
                    // Yes, you right. We put "persistent" class when it is NOT persistent. 🤦
                    persistent: !persistent,
                    noHover: noHover,
                });
        },
        enumerable: true,
        configurable: true
    });
    CardOverlay.prototype.render = function () {
        var _a = this.props, error = _a.error, noHover = _a.noHover, mediaName = _a.mediaName, persistent = _a.persistent, actions = _a.actions;
        var titleText = error || !mediaName ? '' : mediaName;
        var menuTriggerColor = !persistent ? 'white' : undefined;
        return (React.createElement(Overlay, { hasError: !!error, noHover: noHover, className: this.wrapperClassNames },
            React.createElement(TopRow, { className: 'top-row' },
                this.errorLine(),
                React.createElement(TitleWrapper, { className: 'title' },
                    React.createElement(Ellipsify, { text: titleText, lines: 2 })),
                this.tickBox()),
            React.createElement(BottomRow, { className: 'bottom-row' },
                React.createElement(LeftColumn, null, this.bottomLeftColumn()),
                React.createElement(RightColumn, null, actions ? (React.createElement(CardActions, { actions: actions, onToggle: this.onMenuToggle, triggerColor: menuTriggerColor })) : null))));
    };
    CardOverlay.prototype.errorLine = function () {
        var error = this.props.error;
        return (error && (React.createElement(ErrorLine, null,
            React.createElement(ErrorMessage, null, this.props.error))));
    };
    CardOverlay.prototype.tickBox = function () {
        var _a = this.props, selected = _a.selected, selectable = _a.selectable;
        var tick = React.createElement(TickIcon, { label: "tick" });
        var className = cx('tickbox', { selected: selected });
        return selectable && React.createElement(TickBox, { className: className },
            " ",
            tick,
            " ");
    };
    CardOverlay.prototype.bottomLeftColumn = function () {
        var _a = this.props, error = _a.error, onRetry = _a.onRetry;
        if (error) {
            if (!onRetry) {
                return React.createElement(ErrorIcon, null);
            }
            return (React.createElement(ErrorWrapper, null,
                React.createElement(ErrorIcon, null),
                React.createElement(Retry, { onClick: onRetry },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.retry)))));
        }
        else {
            var _b = this.props, mediaType = _b.mediaType, subtitle = _b.subtitle, icon = _b.icon;
            var classNames_1 = cx('metadata');
            var fileIcon = mediaType || icon ? (React.createElement(FileIcon, { mediaType: mediaType, iconUrl: icon })) : null;
            var subtitleEl = subtitle ? (React.createElement(Subtitle, { className: "file-size" }, subtitle)) : null;
            return (React.createElement("div", null,
                React.createElement(Metadata, { className: classNames_1 },
                    fileIcon,
                    subtitleEl)));
        }
    };
    CardOverlay.prototype.removeBtnClick = function (handler) {
        return function (e) {
            e.preventDefault();
            e.stopPropagation();
            handler();
        };
    };
    CardOverlay.defaultProps = {
        actions: [],
        mediaName: '',
    };
    return CardOverlay;
}(Component));
export { CardOverlay };
//# sourceMappingURL=index.js.map