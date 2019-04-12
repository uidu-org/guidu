import * as tslib_1 from "tslib";
import * as React from 'react';
import ImageLoader from 'react-render-image';
import { Image } from './styled';
var ImageIcon = /** @class */ (function (_super) {
    tslib_1.__extends(ImageIcon, _super);
    function ImageIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageIcon.prototype.render = function () {
        var _a = this.props, _b = _a.alt, alt = _b === void 0 ? '' : _b, src = _a.src, _c = _a.size, size = _c === void 0 ? 16 : _c, title = _a.title;
        if (!src) {
            return this.props.default || null;
        }
        return (React.createElement(ImageLoader, { src: src, loading: this.props.default, loaded: React.createElement(Image, { src: src, alt: alt, size: size, title: title }), errored: this.props.default }));
    };
    return ImageIcon;
}(React.Component));
export { ImageIcon };
//# sourceMappingURL=index.js.map