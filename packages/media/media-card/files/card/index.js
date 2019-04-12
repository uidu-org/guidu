import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { messages } from '@uidu/media-ui';
import { FormattedMessage } from 'react-intl';
import { FileCardImageView } from '../cardImageView';
import { toHumanReadableMediaSize } from '../../utils';
var FileCard = /** @class */ (function (_super) {
    tslib_1.__extends(FileCard, _super);
    function FileCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileCard.prototype.render = function () {
        return this.renderFile();
    };
    FileCard.prototype.renderFile = function () {
        var _a = this.props, status = _a.status, dimensions = _a.dimensions, selectable = _a.selectable, selected = _a.selected, details = _a.details, dataURI = _a.dataURI, progress = _a.progress, resizeMode = _a.resizeMode, onRetry = _a.onRetry, disableOverlay = _a.disableOverlay, mediaItemType = _a.mediaItemType, previewOrientation = _a.previewOrientation;
        var defaultDetails = {
            id: '',
            name: undefined,
            mediaType: undefined,
            size: undefined,
        };
        var _b = details || defaultDetails, name = _b.name, mediaType = _b.mediaType, size = _b.size;
        var errorMessage = this.isError && (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.failed_to_load)));
        var fileSize = mediaItemType === 'external-image'
            ? ''
            : toHumanReadableMediaSize(size || 0);
        return (React.createElement(FileCardImageView, { error: errorMessage, dimensions: dimensions, selectable: selectable, selected: selected, dataURI: dataURI, mediaName: name, mediaType: mediaType, fileSize: fileSize, status: status, progress: progress, resizeMode: resizeMode, onRetry: onRetry, actions: this._getActions(), disableOverlay: disableOverlay, previewOrientation: previewOrientation }));
    };
    FileCard.prototype._getActions = function () {
        var details = this.props.details;
        if (!details) {
            return [];
        }
        var actions = this.props.actions || [];
        return actions.map(function (action) {
            return tslib_1.__assign({}, action, { handler: function () {
                    action.handler({ type: 'file', details: details });
                } });
        });
    };
    Object.defineProperty(FileCard.prototype, "isError", {
        get: function () {
            var status = this.props.status;
            return status === 'error';
        },
        enumerable: true,
        configurable: true
    });
    FileCard.defaultProps = {
        actions: [],
    };
    return FileCard;
}(Component));
export { FileCard };
//# sourceMappingURL=index.js.map