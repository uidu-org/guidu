import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import { shouldDisplayImageThumbnail } from '../utils/shouldDisplayImageThumbnail';
import { getBaseAnalyticsContext } from '../utils/analyticsUtils';
var mapStatusToAnalyticsLoadStatus = function (status) {
    if (status === 'error' || status === 'failed-processing') {
        return 'fail';
    }
    else if (status === 'loading' || status === 'processing') {
        return 'loading_metadata';
    }
    else {
        return status;
    }
};
var WithCardViewAnalyticsContext = /** @class */ (function (_super) {
    tslib_1.__extends(WithCardViewAnalyticsContext, _super);
    function WithCardViewAnalyticsContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithCardViewAnalyticsContext.prototype.getBaseAnalyticsContext = function () {
        var mediaItemType = this.props.mediaItemType;
        var _a = this.props, status = _a.status, appearance = _a.appearance, actions = _a.actions;
        var loadStatus = mapStatusToAnalyticsLoadStatus(status);
        var hasActionMenuItems = !!(actions && actions.length > 0);
        return tslib_1.__assign({}, getBaseAnalyticsContext('CardView', null), { type: mediaItemType, loadStatus: loadStatus, viewAttributes: {
                viewPreview: false,
                viewSize: appearance,
                viewActionmenu: hasActionMenuItems,
            } });
    };
    WithCardViewAnalyticsContext.prototype.getFileCardAnalyticsContext = function (metadata) {
        var dataURI = this.props.dataURI;
        var analyticsContext = this.getBaseAnalyticsContext();
        analyticsContext.actionSubjectId = metadata.id;
        analyticsContext.viewAttributes.viewPreview = shouldDisplayImageThumbnail(dataURI, metadata.mediaType);
        var fileAttributes = {
            fileMediatype: metadata.mediaType,
            fileSize: metadata.size,
            fileStatus: metadata.processingStatus,
            fileMimetype: metadata.mimeType,
        };
        return tslib_1.__assign({}, analyticsContext, { fileAttributes: fileAttributes });
    };
    Object.defineProperty(WithCardViewAnalyticsContext.prototype, "analyticsContext", {
        get: function () {
            if (this.props.metadata) {
                var metadata = this.props.metadata;
                return this.getFileCardAnalyticsContext(metadata);
            }
            else {
                return this.getBaseAnalyticsContext();
            }
        },
        enumerable: true,
        configurable: true
    });
    WithCardViewAnalyticsContext.prototype.render = function () {
        return (React.createElement(AnalyticsContext, { data: this.analyticsContext }, this.props.children));
    };
    return WithCardViewAnalyticsContext;
}(React.Component));
export { WithCardViewAnalyticsContext };
//# sourceMappingURL=withCardViewAnalyticsContext.js.map