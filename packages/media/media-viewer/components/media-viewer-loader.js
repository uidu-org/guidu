import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors } from '@uidu/theme';
import { ModalSpinner } from '@uidu/media-ui';
var AsyncMediaViewer = /** @class */ (function (_super) {
    tslib_1.__extends(AsyncMediaViewer, _super);
    function AsyncMediaViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            // Set state value to equal to current static value of this class.
            MediaViewer: AsyncMediaViewer.MediaViewer,
        };
        return _this;
    }
    AsyncMediaViewer.prototype.componentWillMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var module_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.state.MediaViewer) return [3 /*break*/, 2];
                        return [4 /*yield*/, import(/* webpackChunkName:"@atlaskit-internal_media-viewer" */ './media-viewer')];
                    case 1:
                        module_1 = _a.sent();
                        AsyncMediaViewer.MediaViewer = module_1.MediaViewer;
                        this.setState({ MediaViewer: module_1.MediaViewer });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AsyncMediaViewer.prototype.render = function () {
        if (!this.state.MediaViewer) {
            return (React.createElement(ModalSpinner, { blankedColor: colors.DN30, invertSpinnerColor: true }));
        }
        return React.createElement(this.state.MediaViewer, tslib_1.__assign({}, this.props));
    };
    AsyncMediaViewer.displayName = 'AsyncMediaViewer';
    return AsyncMediaViewer;
}(React.PureComponent));
export default AsyncMediaViewer;
//# sourceMappingURL=media-viewer-loader.js.map