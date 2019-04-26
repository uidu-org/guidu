import * as tslib_1 from "tslib";
export var isBinaryUploader = function (component) {
    return 'upload' in component;
};
export var isBrowser = function (component) {
    return component && 'browse' in component && 'teardown' in component;
};
export var isClipboard = function (component) {
    return component && 'activate' in component && 'deactivate' in component;
};
export var isDropzone = function (component) {
    return component && 'activate' in component && 'deactivate' in component;
};
export var isPopup = function (component) {
    return component &&
        ['show', 'cancel', 'teardown', 'hide'].every(function (prop) { return prop in component; });
};
// Events public API and types
export { isImagePreview, } from './domain/uploadEvent';
export function MediaPicker(componentName, context, pickerConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, BinaryUploaderImpl, BrowserImpl, ClipboardImpl, DropzoneImpl, PopupImpl;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = componentName;
                    switch (_a) {
                        case 'binary': return [3 /*break*/, 1];
                        case 'browser': return [3 /*break*/, 3];
                        case 'clipboard': return [3 /*break*/, 5];
                        case 'dropzone': return [3 /*break*/, 7];
                        case 'popup': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, import(/* webpackChunkName:"@uidu-internal_media-picker-binary" */ './components/binary')];
                case 2:
                    BinaryUploaderImpl = (_b.sent()).BinaryUploaderImpl;
                    return [2 /*return*/, new BinaryUploaderImpl(context, pickerConfig)];
                case 3: return [4 /*yield*/, import(/* webpackChunkName:"@uidu-internal_media-picker-browser" */ './components/browser')];
                case 4:
                    BrowserImpl = (_b.sent()).BrowserImpl;
                    return [2 /*return*/, new BrowserImpl(context, pickerConfig)];
                case 5: return [4 /*yield*/, import(/* webpackChunkName:"@uidu-internal_media-picker-clipboard" */ './components/clipboard')];
                case 6:
                    ClipboardImpl = (_b.sent()).ClipboardImpl;
                    return [2 /*return*/, new ClipboardImpl(context, pickerConfig)];
                case 7: return [4 /*yield*/, import(/* webpackChunkName:"@uidu-internal_media-picker-dropzone" */ './components/dropzone')];
                case 8:
                    DropzoneImpl = (_b.sent()).DropzoneImpl;
                    return [2 /*return*/, new DropzoneImpl(context, pickerConfig)];
                case 9: return [4 /*yield*/, import(/* webpackChunkName:"@uidu-internal_media-picker-popup" */ './components/popup')];
                case 10:
                    PopupImpl = (_b.sent()).PopupImpl;
                    return [2 /*return*/, new PopupImpl(context, pickerConfig)];
                case 11: throw new Error("The component " + componentName + " does not exist");
            }
        });
    });
}
//# sourceMappingURL=index.js.map