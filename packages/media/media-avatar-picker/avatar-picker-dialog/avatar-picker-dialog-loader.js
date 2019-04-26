import * as tslib_1 from "tslib";
import * as React from 'react';
import { ModalSpinner } from '@uidu/media-ui';
var AsyncAvatarPickerDialog = /** @class */ (function (_super) {
    tslib_1.__extends(AsyncAvatarPickerDialog, _super);
    function AsyncAvatarPickerDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            // Set state value to equal to current static value of this class.
            AvatarPickerDialog: AsyncAvatarPickerDialog.AvatarPickerDialog,
        };
        return _this;
    }
    AsyncAvatarPickerDialog.prototype.componentWillMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var module_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.state.AvatarPickerDialog) return [3 /*break*/, 2];
                        return [4 /*yield*/, import(/* webpackChunkName:"@uidu-internal_media-avatar-picker" */ '.')];
                    case 1:
                        module_1 = _a.sent();
                        AsyncAvatarPickerDialog.AvatarPickerDialog = module_1.AvatarPickerDialog;
                        this.setState({ AvatarPickerDialog: module_1.AvatarPickerDialog });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AsyncAvatarPickerDialog.prototype.render = function () {
        if (!this.state.AvatarPickerDialog) {
            return (React.createElement(ModalSpinner, { blankedColor: "rgba(255, 255, 255, 0.53)", invertSpinnerColor: false }));
        }
        return React.createElement(this.state.AvatarPickerDialog, tslib_1.__assign({}, this.props));
    };
    AsyncAvatarPickerDialog.displayName = 'AsyncAvatarPickerDialog';
    return AsyncAvatarPickerDialog;
}(React.PureComponent));
export default AsyncAvatarPickerDialog;
//# sourceMappingURL=avatar-picker-dialog-loader.js.map