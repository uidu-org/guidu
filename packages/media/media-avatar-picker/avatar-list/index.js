import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { AvatarListWrapper } from './styled';
import { SmallAvatarImage } from '../predefined-avatar-view/styled';
var AvatarList = /** @class */ (function (_super) {
    tslib_1.__extends(AvatarList, _super);
    function AvatarList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onItemClick = function (avatar) { return function () {
            var onItemClick = _this.props.onItemClick;
            if (onItemClick) {
                onItemClick(avatar);
            }
        }; };
        return _this;
    }
    AvatarList.prototype.render = function () {
        var _this = this;
        var _a = this.props, avatars = _a.avatars, selectedAvatar = _a.selectedAvatar;
        var cards = avatars.map(function (avatar, idx) {
            var elementKey = "predefined-avatar-" + idx;
            return (React.createElement("li", { key: elementKey },
                React.createElement(SmallAvatarImage, { isSelected: avatar === selectedAvatar, src: avatar.dataURI, onClick: _this.onItemClick(avatar) })));
        });
        return (React.createElement(AvatarListWrapper, null,
            React.createElement("ul", null, cards)));
    };
    AvatarList.defaultProps = {
        avatars: [],
    };
    return AvatarList;
}(PureComponent));
export { AvatarList };
//# sourceMappingURL=index.js.map