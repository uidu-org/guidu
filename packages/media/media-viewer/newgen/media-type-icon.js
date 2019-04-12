import * as tslib_1 from "tslib";
/* tslint:disable:variable-collectionName */
import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/media-services/image';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import VideoIcon from '@atlaskit/icon/glyph/media-services/video';
import DocIcon from '@atlaskit/icon/glyph/media-services/document';
import UnknownIcon from '@atlaskit/icon/glyph/media-services/unknown';
import { IconWrapper } from './styled';
var icons = {
    image: ImageIcon,
    audio: AudioIcon,
    video: VideoIcon,
    doc: DocIcon,
    unknown: UnknownIcon,
};
var defaultType = 'unknown';
var MediaTypeIcon = /** @class */ (function (_super) {
    tslib_1.__extends(MediaTypeIcon, _super);
    function MediaTypeIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaTypeIcon.prototype.render = function () {
        var type = this.props.type;
        var typeWithDefault = type || defaultType;
        var Icon = icons[typeWithDefault] || icons[defaultType];
        return (React.createElement(IconWrapper, { type: typeWithDefault },
            React.createElement(Icon, { label: "media-type", size: "large" })));
    };
    MediaTypeIcon.defaultProps = {
        type: defaultType,
    };
    return MediaTypeIcon;
}(React.Component));
export { MediaTypeIcon };
//# sourceMappingURL=media-type-icon.js.map