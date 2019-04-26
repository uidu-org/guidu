import * as tslib_1 from "tslib";
import * as React from 'react';
import { ModalSpinner } from '@uidu/media-ui';
import { colors } from '@uidu/theme';
var AsyncSmartMediaEditor = /** @class */ (function (_super) {
    tslib_1.__extends(AsyncSmartMediaEditor, _super);
    function AsyncSmartMediaEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            // Set state value to equal to current static value of this class.
            SmartMediaEditor: AsyncSmartMediaEditor.SmartMediaEditor,
        };
        return _this;
    }
    AsyncSmartMediaEditor.prototype.componentWillMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var module_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.state.SmartMediaEditor) return [3 /*break*/, 2];
                        return [4 /*yield*/, import(/* webpackChunkName:"@atlaskit-internal_smart-media-editor" */ './smartMediaEditor')];
                    case 1:
                        module_1 = _a.sent();
                        AsyncSmartMediaEditor.SmartMediaEditor = module_1.default;
                        this.setState({ SmartMediaEditor: module_1.default });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AsyncSmartMediaEditor.prototype.render = function () {
        if (!this.state.SmartMediaEditor) {
            return (React.createElement(ModalSpinner, { blankedColor: colors.N700A, invertSpinnerColor: true }));
        }
        return React.createElement(this.state.SmartMediaEditor, tslib_1.__assign({}, this.props));
    };
    AsyncSmartMediaEditor.displayName = 'AsyncSmartMediaEditor';
    return AsyncSmartMediaEditor;
}(React.PureComponent));
export default AsyncSmartMediaEditor;
//# sourceMappingURL=smartMediaEditorLoader.js.map