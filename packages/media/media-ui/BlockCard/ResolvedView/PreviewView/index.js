import * as tslib_1 from "tslib";
import * as React from 'react';
import ImageLoader from 'react-render-image';
import ImageIcon from '@atlaskit/icon/glyph/image';
import NoImageIcon from './NoImageIcon';
import { Wrapper, ImageWrapper, IconWrapper } from './styled';
export var LoadingView = function () { return (React.createElement(IconWrapper, null,
    React.createElement(ImageIcon, { size: "xlarge", label: "loading" }))); };
export var NoImageView = function () { return (React.createElement(IconWrapper, null,
    React.createElement(NoImageIcon, null))); };
export var LoadedView = function (_a) {
    var url = _a.url;
    return (React.createElement(ImageWrapper, { url: url }));
};
var PreviewView = /** @class */ (function (_super) {
    tslib_1.__extends(PreviewView, _super);
    function PreviewView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviewView.prototype.renderContent = function () {
        var url = this.props.url;
        if (!url) {
            return React.createElement(NoImageView, null);
        }
        return (React.createElement(ImageLoader, { src: url, loading: React.createElement(LoadingView, null), loaded: React.createElement(LoadedView, { url: url }), errored: React.createElement(NoImageView, null) }));
    };
    PreviewView.prototype.render = function () {
        return React.createElement(Wrapper, null, this.renderContent());
    };
    return PreviewView;
}(React.Component));
export { PreviewView };
//# sourceMappingURL=index.js.map