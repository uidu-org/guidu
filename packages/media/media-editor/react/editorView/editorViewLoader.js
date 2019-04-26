import * as tslib_1 from "tslib";
import * as React from 'react';
import { ModalSpinner } from '@uidu/media-ui';
var AsyncEditorView = /** @class */ (function (_super) {
    tslib_1.__extends(AsyncEditorView, _super);
    function AsyncEditorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            // Set state value to equal to current static value of this class.
            EditorView: AsyncEditorView.EditorView,
        };
        return _this;
    }
    AsyncEditorView.prototype.componentWillMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var module_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.state.EditorView) return [3 /*break*/, 2];
                        return [4 /*yield*/, import(/* webpackChunkName:"@atlaskit-internal_media-editor-view" */ './editorView')];
                    case 1:
                        module_1 = _a.sent();
                        AsyncEditorView.EditorView = module_1.default;
                        this.setState({ EditorView: module_1.default });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AsyncEditorView.prototype.render = function () {
        if (!this.state.EditorView) {
            return React.createElement(ModalSpinner, { blankedColor: "none", invertSpinnerColor: false });
        }
        return React.createElement(this.state.EditorView, tslib_1.__assign({}, this.props));
    };
    AsyncEditorView.displayName = 'AsyncEditorView';
    return AsyncEditorView;
}(React.PureComponent));
export default AsyncEditorView;
//# sourceMappingURL=editorViewLoader.js.map