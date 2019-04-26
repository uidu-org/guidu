import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { AvatarList } from '../avatar-list';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import Button from '@uidu/button';
import { PredefinedAvatarsWrapper } from './styled';
var ShowMoreButton = /** @class */ (function (_super) {
    tslib_1.__extends(ShowMoreButton, _super);
    function ShowMoreButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowMoreButton.prototype.render = function () {
        return (React.createElement(Button, { className: "show-more-button", iconAfter: React.createElement(EditorMoreIcon, { label: "", size: "large" }), onClick: this.props.onClick }));
    };
    return ShowMoreButton;
}(PureComponent));
var PredefinedAvatarList = /** @class */ (function (_super) {
    tslib_1.__extends(PredefinedAvatarList, _super);
    function PredefinedAvatarList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredefinedAvatarList.prototype.componentWillMount = function () {
        var _this = this;
        this.setState(function (state) {
            var avatars = _this.props.avatars;
            return tslib_1.__assign({}, state, { avatars: avatars });
        });
    };
    PredefinedAvatarList.prototype.render = function () {
        var _a = this.props, avatars = _a.avatars, selectedAvatar = _a.selectedAvatar, onShowMore = _a.onShowMore, onAvatarSelected = _a.onAvatarSelected;
        return (React.createElement(PredefinedAvatarsWrapper, null,
            React.createElement(AvatarList, { avatars: avatars, selectedAvatar: selectedAvatar, onItemClick: onAvatarSelected }),
            React.createElement(ShowMoreButton, { onClick: onShowMore })));
    };
    PredefinedAvatarList.defaultProps = {
        avatars: [],
    };
    return PredefinedAvatarList;
}(PureComponent));
export { PredefinedAvatarList };
//# sourceMappingURL=index.js.map