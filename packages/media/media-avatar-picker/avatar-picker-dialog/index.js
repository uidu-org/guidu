import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import ModalDialog, { ModalFooter } from '@uidu/modal-dialog';
import Button from '@uidu/button';
import { FormattedMessage, intlShape, IntlProvider } from 'react-intl';
import { messages } from '@uidu/media-ui';
import ImageNavigator from '../image-navigator';
import { PredefinedAvatarList } from '../predefined-avatar-list';
import { AvatarPickerViewWrapper, ModalHeader, CroppingWrapper, ModalFooterButtons, } from './styled';
import { PredefinedAvatarView } from '../predefined-avatar-view';
import { dataURItoFile, fileToDataURI } from '../util';
import { CONTAINER_SIZE } from '../image-navigator/index';
import { DEFAULT_VISIBLE_PREDEFINED_AVATARS } from './layout-const';
import { AVATAR_DIALOG_WIDTH, AVATAR_DIALOG_HEIGHT } from './layout-const';
import { Mode, } from './types';
export var MAX_SIZE_MB = 10;
export var ERROR = {
    URL: messages.image_url_invalid_error,
    FORMAT: messages.image_format_invalid_error,
    SIZE: messages.image_size_too_large_error,
};
export var ACCEPT = ['image/gif', 'image/jpeg', 'image/png'];
var AvatarPickerDialog = /** @class */ (function (_super) {
    tslib_1.__extends(AvatarPickerDialog, _super);
    function AvatarPickerDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            mode: Mode.Cropping,
            crop: {
                x: 0,
                y: 0,
                size: CONTAINER_SIZE,
            },
            selectedAvatar: _this.props.defaultSelectedAvatar,
            selectedImageSource: _this.props.errorMessage
                ? undefined
                : _this.props.imageSource,
            selectedImage: undefined,
            errorMessage: _this.props.errorMessage,
        };
        _this.setSelectedImageState = function (selectedImage, crop) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var dataURI, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.setState({ selectedImage: selectedImage, crop: crop });
                        return [4 /*yield*/, fileToDataURI(selectedImage)];
                    case 1:
                        dataURI = _a.sent();
                        this.setState({ selectedImageSource: dataURI });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.setSelectedAvatarState = function (avatar) {
            _this.setState({
                selectedAvatar: avatar,
            });
        };
        /**
         * Updates the image position state. These numbers are always positive.
         *
         * @param x the number of pixels from the left edge of the image
         * @param y the number of pixels from the top edge of the image
         */
        _this.setPositionState = function (x, y) {
            var size = _this.state.crop.size;
            _this.setState({ crop: { x: x, y: y, size: size } });
        };
        _this.setSizeState = function (size) {
            var _a = _this.state.crop, x = _a.x, y = _a.y;
            _this.setState({ crop: { x: x, y: y, size: size } });
        };
        _this.onImageNavigatorLoad = function (loadParams) {
            _this.exportCroppedImage = loadParams.export;
        };
        /**
         * Initialised with no-op function.  Is assigned cropped image exporting
         * function when internal ImageCropper mounts via this.onImageNavigatorLoad
         */
        _this.exportCroppedImage = function () { return ''; };
        _this.onSaveClick = function () {
            var _a = _this.props, imageSource = _a.imageSource, onImagePicked = _a.onImagePicked, onImagePickedDataURI = _a.onImagePickedDataURI, onAvatarPicked = _a.onAvatarPicked;
            var _b = _this.state, selectedImage = _b.selectedImage, crop = _b.crop, selectedAvatar = _b.selectedAvatar;
            var image = selectedImage
                ? selectedImage
                : imageSource && dataURItoFile(imageSource);
            if (image) {
                if (onImagePicked) {
                    onImagePicked(image, crop);
                }
                if (onImagePickedDataURI) {
                    onImagePickedDataURI(_this.exportCroppedImage());
                }
            }
            else if (selectedAvatar) {
                onAvatarPicked(selectedAvatar);
            }
        };
        _this.onShowMore = function () {
            _this.setState({ mode: Mode.PredefinedAvatars });
        };
        _this.onGoBack = function () {
            _this.clearErrorState();
        };
        _this.onRemoveImage = function () {
            _this.setState({
                selectedImageSource: undefined,
                selectedImage: undefined,
                mode: Mode.Cropping,
            });
        };
        _this.clearErrorState = function () {
            _this.setState({
                mode: Mode.Cropping,
                errorMessage: undefined,
            });
        };
        _this.setErrorState = function (errorMessage) {
            _this.setState({
                mode: Mode.Cropping,
                errorMessage: errorMessage,
            });
        };
        _this.onImageUploaded = function () {
            _this.clearErrorState();
        };
        _this.onImageError = function (errorMessage) {
            _this.setErrorState(errorMessage);
        };
        _this.headerContent = function () {
            var title = _this.props.title;
            return (React.createElement(ModalHeader, null, title || React.createElement(FormattedMessage, tslib_1.__assign({}, messages.upload_an_avatar))));
        };
        _this.footerContent = function () {
            var _a = _this.props, primaryButtonText = _a.primaryButtonText, onCancel = _a.onCancel;
            var _b = _this, onSaveClick = _b.onSaveClick, isDisabled = _b.isDisabled;
            return (React.createElement(ModalFooter, null,
                React.createElement(ModalFooterButtons, null,
                    React.createElement(Button, { appearance: "primary", onClick: onSaveClick, isDisabled: isDisabled }, primaryButtonText || React.createElement(FormattedMessage, tslib_1.__assign({}, messages.save))),
                    React.createElement(Button, { appearance: "default", onClick: onCancel },
                        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.cancel))))));
        };
        return _this;
    }
    AvatarPickerDialog.prototype.render = function () {
        var content = (React.createElement(ModalDialog, { height: AVATAR_DIALOG_HEIGHT + "px", width: AVATAR_DIALOG_WIDTH + "px", components: {
                Header: this.headerContent,
                Footer: this.footerContent,
            }, onClose: this.props.onCancel, isOpen: true },
            React.createElement(AvatarPickerViewWrapper, null, this.renderBody())));
        return this.context.intl ? (content) : (React.createElement(IntlProvider, { locale: "en" }, content));
    };
    Object.defineProperty(AvatarPickerDialog.prototype, "isDisabled", {
        get: function () {
            var _a = this.state, selectedImage = _a.selectedImage, selectedAvatar = _a.selectedAvatar;
            var _b = this.props, imageSource = _b.imageSource, isLoading = _b.isLoading;
            return isLoading || !(imageSource || selectedImage || selectedAvatar);
        },
        enumerable: true,
        configurable: true
    });
    AvatarPickerDialog.prototype.getPredefinedAvatars = function () {
        var avatars = this.props.avatars;
        var selectedAvatar = this.state.selectedAvatar;
        var avatarsSubset = avatars.slice(0, DEFAULT_VISIBLE_PREDEFINED_AVATARS);
        if (selectedAvatar &&
            avatars.indexOf(selectedAvatar) >= DEFAULT_VISIBLE_PREDEFINED_AVATARS) {
            avatarsSubset[avatarsSubset.length - 1] = selectedAvatar;
        }
        return avatarsSubset;
    };
    AvatarPickerDialog.prototype.renderPredefinedAvatarList = function () {
        var isLoading = this.props.isLoading;
        var _a = this.state, selectedAvatar = _a.selectedAvatar, selectedImage = _a.selectedImage, selectedImageSource = _a.selectedImageSource;
        var avatars = this.getPredefinedAvatars();
        if (isLoading ||
            selectedImage ||
            selectedImageSource ||
            avatars.length === 0) {
            return null;
        }
        return (React.createElement(PredefinedAvatarList, { selectedAvatar: selectedAvatar, avatars: avatars, onAvatarSelected: this.setSelectedAvatarState, onShowMore: this.onShowMore }));
    };
    AvatarPickerDialog.prototype.renderBody = function () {
        var _a = this.props, avatars = _a.avatars, isLoading = _a.isLoading, predefinedAvatarsText = _a.predefinedAvatarsText;
        var _b = this.state, mode = _b.mode, selectedImageSource = _b.selectedImageSource, selectedAvatar = _b.selectedAvatar, errorMessage = _b.errorMessage;
        switch (mode) {
            case Mode.Cropping:
                return (React.createElement(CroppingWrapper, null,
                    React.createElement(ImageNavigator, { imageSource: selectedImageSource, errorMessage: errorMessage, onImageLoaded: this.setSelectedImageState, onLoad: this.onImageNavigatorLoad, onPositionChanged: this.setPositionState, onSizeChanged: this.setSizeState, onRemoveImage: this.onRemoveImage, onImageUploaded: this.onImageUploaded, onImageError: this.onImageError, isLoading: isLoading }),
                    this.renderPredefinedAvatarList()));
            case Mode.PredefinedAvatars:
                return (React.createElement("div", null,
                    React.createElement(PredefinedAvatarView, { avatars: avatars, onAvatarSelected: this.setSelectedAvatarState, onGoBack: this.onGoBack, selectedAvatar: selectedAvatar, predefinedAvatarsText: predefinedAvatarsText })));
        }
    };
    AvatarPickerDialog.defaultProps = {
        avatars: [],
    };
    AvatarPickerDialog.contextTypes = {
        intl: intlShape,
    };
    return AvatarPickerDialog;
}(PureComponent));
export { AvatarPickerDialog };
//# sourceMappingURL=index.js.map