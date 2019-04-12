import * as tslib_1 from "tslib";
import * as React from 'react';
import * as deepEqual from 'deep-equal';
import { messages, toHumanReadableMediaSize } from '@uidu/media-ui';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Outcome } from './domain';
import { Header as HeaderWrapper, LeftHeader, RightHeader, MetadataWrapper, MetadataSubText, MedatadataTextWrapper, MetadataIconWrapper, MetadataFileName, hideControlsClassName, } from './styled';
import { MediaTypeIcon } from './media-type-icon';
import { createError } from './error';
import { ToolbarDownloadButton, DisabledToolbarDownloadButton, } from './download';
var initialState = {
    item: Outcome.pending(),
};
var Header = /** @class */ (function (_super) {
    tslib_1.__extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = initialState;
        _this.renderDownload = function () {
            var item = _this.state.item;
            var _a = _this.props, identifier = _a.identifier, context = _a.context;
            return item.match({
                pending: function () { return DisabledToolbarDownloadButton; },
                failed: function () { return DisabledToolbarDownloadButton; },
                successful: function (item) { return (React.createElement(ToolbarDownloadButton, { state: item, identifier: identifier, context: context })); },
            });
        };
        _this.renderSize = function (item) {
            if (item.size) {
                return _this.renderSeparator() + toHumanReadableMediaSize(item.size);
            }
            else {
                return '';
            }
        };
        _this.renderSeparator = function () {
            return ' · ';
        };
        _this.renderFileTypeText = function (mediaType) {
            var mediaTypeTranslationMap = {
                doc: messages.document,
                audio: messages.audio,
                video: messages.video,
                image: messages.image,
                unknown: messages.unknown,
            };
            var message = mediaTypeTranslationMap[mediaType || 'unknown'];
            // Defaulting to unknown again since backend has more mediaTypes than the current supported ones
            return React.createElement(FormattedMessage, tslib_1.__assign({}, message || messages.unknown));
        };
        _this.getMediaIcon = function (mediaType) {
            return React.createElement(MediaTypeIcon, { type: mediaType });
        };
        return _this;
    }
    Header.prototype.componentWillUpdate = function (nextProps) {
        if (this.needsReset(this.props, nextProps)) {
            this.release();
            this.init(nextProps);
        }
    };
    Header.prototype.componentDidMount = function () {
        this.init(this.props);
    };
    Header.prototype.componentWillUnmount = function () {
        this.release();
    };
    Header.prototype.init = function (props) {
        var _this = this;
        this.setState(initialState, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var context, identifier, id, _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context = props.context, identifier = props.identifier;
                        if (!(typeof identifier.id === 'string')) return [3 /*break*/, 1];
                        _a = identifier.id;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, identifier.id];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        id = _a;
                        this.subscription = context.file
                            .getFileState(id, {
                            collectionName: identifier.collectionName,
                        })
                            .subscribe({
                            next: function (file) {
                                _this.setState({
                                    item: Outcome.successful(file),
                                });
                            },
                            error: function (err) {
                                _this.setState({
                                    item: Outcome.failed(createError('metadataFailed', err)),
                                });
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Header.prototype.render = function () {
        return (React.createElement(HeaderWrapper, { className: hideControlsClassName },
            React.createElement(LeftHeader, null, this.renderMetadata()),
            React.createElement(RightHeader, null, this.renderDownload())));
    };
    Header.prototype.renderMetadata = function () {
        var _this = this;
        var item = this.state.item;
        return item.match({
            successful: function (item) { return _this.renderMetadataLayout(item); },
            pending: function () { return null; },
            failed: function () { return null; },
        });
    };
    Header.prototype.renderMetadataLayout = function (item) {
        if (item.status === 'processed' || item.status === 'processing') {
            return (React.createElement(MetadataWrapper, null,
                React.createElement(MetadataIconWrapper, null, this.getMediaIcon(item.mediaType)),
                React.createElement(MedatadataTextWrapper, null,
                    React.createElement(MetadataFileName, null, item.name || React.createElement(FormattedMessage, tslib_1.__assign({}, messages.unknown))),
                    React.createElement(MetadataSubText, null,
                        this.renderFileTypeText(item.mediaType),
                        this.renderSize(item)))));
        }
        else {
            return null;
        }
    };
    Header.prototype.needsReset = function (propsA, propsB) {
        return (!deepEqual(propsA.identifier, propsB.identifier) ||
            propsA.context !== propsB.context);
    };
    Header.prototype.release = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    return Header;
}(React.Component));
export { Header };
export default injectIntl(Header);
//# sourceMappingURL=header.js.map