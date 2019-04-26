import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { PredefinedAvatarViewWrapper, LargeAvatarImage } from './styled';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@uidu/button';
var BackBtn = /** @class */ (function (_super) {
    tslib_1.__extends(BackBtn, _super);
    function BackBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackBtn.prototype.render = function () {
        return (React.createElement(Button, { className: "back-button", iconAfter: React.createElement(ArrowLeftIcon, { label: "" }), onClick: this.props.onClick }));
    };
    return BackBtn;
}(PureComponent));
var PredefinedAvatarView = /** @class */ (function (_super) {
    tslib_1.__extends(PredefinedAvatarView, _super);
    function PredefinedAvatarView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredefinedAvatarView.prototype.render = function () {
        var _this = this;
        var _a = this.props, avatars = _a.avatars, selectedAvatar = _a.selectedAvatar, onGoBack = _a.onGoBack, predefinedAvatarsText = _a.predefinedAvatarsText;
        var cards = avatars.map(function (avatar, idx) {
            var elementKey = "predefined-avatar-" + idx;
            return (React.createElement("li", { key: elementKey },
                React.createElement(LargeAvatarImage, { isSelected: avatar === selectedAvatar, src: avatar.dataURI, onClick: _this.createOnItemClickHandler(avatar) })));
        });
        return (React.createElement(PredefinedAvatarViewWrapper, null,
            React.createElement("div", { className: "header" },
                React.createElement(BackBtn, { onClick: onGoBack }),
                React.createElement("div", { className: "description" }, predefinedAvatarsText || (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.default_avatars))))),
            React.createElement("ul", null, cards)));
    };
    PredefinedAvatarView.prototype.createOnItemClickHandler = function (avatar) {
        var onAvatarSelected = this.props.onAvatarSelected;
        return function () {
            if (onAvatarSelected) {
                onAvatarSelected(avatar);
            }
        };
    };
    PredefinedAvatarView.defaultProps = {
        avatars: [],
        onAvatarSelected: function () { },
    };
    return PredefinedAvatarView;
}(PureComponent));
export { PredefinedAvatarView };
//# sourceMappingURL=index.js.map