import * as tslib_1 from "tslib";
import * as React from 'react';
var _payload = { status: 'success' };
export var setViewerPayload = function (payload) {
    _payload = payload;
};
var ImageViewer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageViewer, _super);
    function ImageViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageViewer.prototype.componentDidMount = function () {
        this.props.onLoad(_payload);
    };
    ImageViewer.prototype.render = function () {
        return React.createElement("div", null, "so empty");
    };
    return ImageViewer;
}(React.Component));
export { ImageViewer };
//# sourceMappingURL=_image-viewer.js.map