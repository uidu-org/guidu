import * as tslib_1 from "tslib";
/* tslint:disable:variable-name */
import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import AudioIcon from '@atlaskit/icon/glyph/audio';
import VideoIcon from '@atlaskit/icon/glyph/media-services/video';
import DocIcon from '@atlaskit/icon/glyph/document';
import UnknownIcon from '@atlaskit/icon/glyph/page';
import { IconWrapper } from './styled';
var icons = {
    image: ImageIcon,
    audio: AudioIcon,
    video: VideoIcon,
    doc: DocIcon,
    unknown: UnknownIcon,
};
var MediaTypeIcon = /** @class */ (function (_super) {
    tslib_1.__extends(MediaTypeIcon, _super);
    function MediaTypeIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaTypeIcon.prototype.render = function () {
        var _a = this.props, type = _a.type, _b = _a.size, size = _b === void 0 ? 'small' : _b, className = _a.className;
        var Icon = (type && icons[type]) || icons.unknown;
        return (React.createElement(IconWrapper, { type: type || 'unknown' },
            React.createElement(Icon, { label: "media-type", size: size, className: className })));
    };
    return MediaTypeIcon;
}(React.Component));
export { MediaTypeIcon };
//# sourceMappingURL=index.js.map