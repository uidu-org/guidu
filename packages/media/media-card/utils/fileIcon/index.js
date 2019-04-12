import * as tslib_1 from "tslib";
/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { MediaTypeIcon } from '../mediaTypeIcon';
import { FileTypeIcon } from './styled';
var fileTypeIconClass = 'file-type-icon';
var FileIcon = /** @class */ (function (_super) {
    tslib_1.__extends(FileIcon, _super);
    function FileIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileIcon.prototype.render = function () {
        var _a = this.props, mediaType = _a.mediaType, iconUrl = _a.iconUrl, style = _a.style;
        var type = mediaType || 'unknown';
        var defaultIcon = (React.createElement(MediaTypeIcon, { type: mediaType, size: "small", className: fileTypeIconClass }));
        var icon = iconUrl ? (React.createElement("img", { src: iconUrl, className: "custom-icon", alt: type })) : (defaultIcon);
        return (React.createElement(FileTypeIcon, { style: style, className: fileTypeIconClass }, icon));
    };
    return FileIcon;
}(Component));
export { FileIcon };
//# sourceMappingURL=index.js.map