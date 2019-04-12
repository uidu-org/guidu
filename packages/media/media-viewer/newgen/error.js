import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ErrorMessageWrapper, ErrorImage } from './styled';
import { messages as i18nMessages } from '@uidu/media-ui';
import { cannotViewFile, errorLoadingFile } from './error-images';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { mediaPreviewFailedEvent } from './analytics/item-viewer';
import { channel } from '../newgen/analytics';
var errorLoadingFileImage = function (formatMessage) { return (React.createElement(ErrorImage, { src: errorLoadingFile, alt: formatMessage(i18nMessages.error_loading_file) })); };
var cannotViewFileImage = function (formatMessage) { return (React.createElement(ErrorImage, { src: cannotViewFile, alt: formatMessage(i18nMessages.error_generating_preview) })); };
var getErrorMessage = function (formatMessage, errorName) {
    var messages = {
        metadataFailed: (React.createElement("div", null,
            errorLoadingFileImage(formatMessage),
            React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, i18nMessages.something_went_wrong))),
            React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, i18nMessages.might_be_a_hiccup))))),
        previewFailed: (React.createElement("div", null,
            cannotViewFileImage(formatMessage),
            React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, i18nMessages.couldnt_generate_preview))))),
        unsupported: (React.createElement("div", null,
            cannotViewFileImage(formatMessage),
            React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, i18nMessages.cant_preview_file_type))))),
        idNotFound: (React.createElement("div", null,
            errorLoadingFileImage(formatMessage),
            React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, i18nMessages.item_not_found_in_list))))),
        noPDFArtifactsFound: (React.createElement("div", null,
            cannotViewFileImage(formatMessage),
            React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, i18nMessages.no_pdf_artifacts))))),
    };
    return messages[errorName];
};
var MediaViewerError = /** @class */ (function () {
    function MediaViewerError(errorName, file, innerError) {
        this.errorName = errorName;
        this.file = file;
        this.innerError = innerError;
    }
    return MediaViewerError;
}());
export { MediaViewerError };
export var createError = function (name, innerError, file) {
    return new MediaViewerError(name, file, innerError);
};
var ErrorMessage = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorMessage, _super);
    function ErrorMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fireAnalytics = function (payload) {
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                var ev = createAnalyticsEvent(payload);
                ev.fire(channel);
            }
        };
        return _this;
    }
    ErrorMessage.prototype.componentDidMount = function () {
        var _a = this.props.error, failReason = _a.errorName, file = _a.file;
        var fileId = file ? file.id : undefined;
        this.fireAnalytics(mediaPreviewFailedEvent(failReason, fileId));
    };
    ErrorMessage.prototype.render = function () {
        var formatMessage = this.props.intl.formatMessage;
        var errorMessage = getErrorMessage(formatMessage, this.props.error.errorName);
        return (React.createElement(ErrorMessageWrapper, null,
            errorMessage,
            this.props.children));
    };
    return ErrorMessage;
}(React.Component));
export { ErrorMessage };
export default withAnalyticsEvents()(injectIntl(ErrorMessage));
//# sourceMappingURL=error.js.map