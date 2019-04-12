import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { isFileIdentifier, isExternalImageIdentifier, isDifferentIdentifier, } from '@uidu/media-core';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { IntlProvider } from 'react-intl';
import { CardView } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';
import { getBaseAnalyticsContext } from '../../utils/analyticsUtils';
import { getDataURIDimension } from '../../utils/getDataURIDimension';
import { getDataURIFromFileState } from '../../utils/getDataURIFromFileState';
import { isBigger } from '../../utils/dimensionComparer';
import { getCardStatus } from './getCardStatus';
import { InlinePlayer } from '../inlinePlayer';
var Card = /** @class */ (function (_super) {
    tslib_1.__extends(Card, _super);
    function Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasBeenMounted = false;
        _this.state = {
            status: 'loading',
            isCardVisible: !_this.props.isLazy,
            previewOrientation: 1,
            isPlayingFile: false,
        };
        _this.shouldRefetchImage = function (current, next) {
            if (!current || !next) {
                return false;
            }
            return isBigger(current, next);
        };
        _this.releaseDataURI = function () {
            var dataURI = _this.state.dataURI;
            if (dataURI) {
                URL.revokeObjectURL(dataURI);
            }
        };
        _this.onLoadingChangeCallback = function () {
            var onLoadingChange = _this.props.onLoadingChange;
            if (onLoadingChange) {
                var _a = _this.state, status_1 = _a.status, error = _a.error, metadata = _a.metadata;
                var state = {
                    type: status_1,
                    payload: error || metadata,
                };
                onLoadingChange(state);
            }
        };
        _this.notifyStateChange = function (state) {
            if (_this.hasBeenMounted) {
                _this.setState(state, _this.onLoadingChangeCallback);
            }
        };
        _this.unsubscribe = function () {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
            if (_this.hasBeenMounted) {
                _this.setState({ dataURI: undefined });
            }
        };
        // This method is called when card fails and user press 'Retry'
        _this.onRetry = function () {
            var _a = _this.props, identifier = _a.identifier, context = _a.context;
            _this.subscribe(identifier, context);
        };
        _this.onClick = function (result, analyticsEvent) {
            var _a = _this.props, onClick = _a.onClick, useInlinePlayer = _a.useInlinePlayer;
            var mediaItemDetails = result.mediaItemDetails;
            _this.onClickPayload = {
                result: result,
                analyticsEvent: analyticsEvent,
            };
            if (onClick) {
                onClick(result, analyticsEvent);
            }
            if (useInlinePlayer && mediaItemDetails) {
                var mediaType = mediaItemDetails.mediaType;
                if (mediaType === 'video') {
                    _this.setState({
                        isPlayingFile: true,
                    });
                }
            }
        };
        _this.onInlinePlayerError = function () {
            _this.setState({
                isPlayingFile: false,
            });
        };
        _this.onInlinePlayerClick = function () {
            var onClick = _this.props.onClick;
            if (onClick && _this.onClickPayload) {
                onClick(_this.onClickPayload.result, _this.onClickPayload.analyticsEvent);
            }
        };
        _this.renderInlinePlayer = function () {
            var _a = _this.props, identifier = _a.identifier, context = _a.context, dimensions = _a.dimensions, selected = _a.selected;
            return (React.createElement(InlinePlayer, { context: context, dimensions: dimensions, identifier: identifier, onError: _this.onInlinePlayerError, onClick: _this.onInlinePlayerClick, selected: selected }));
        };
        _this.renderCard = function () {
            var _a = _this.props, isLazy = _a.isLazy, appearance = _a.appearance, resizeMode = _a.resizeMode, dimensions = _a.dimensions, selectable = _a.selectable, selected = _a.selected, onMouseEnter = _a.onMouseEnter, onSelectChange = _a.onSelectChange, disableOverlay = _a.disableOverlay, identifier = _a.identifier;
            var _b = _this.state, progress = _b.progress, metadata = _b.metadata, dataURI = _b.dataURI, previewOrientation = _b.previewOrientation;
            var _c = _this, analyticsContext = _c.analyticsContext, onRetry = _c.onRetry, onClick = _c.onClick, actions = _c.actions;
            var status = getCardStatus(_this.state, _this.props);
            var card = (React.createElement(AnalyticsContext, { data: analyticsContext },
                React.createElement(CardView, { status: status, metadata: metadata, dataURI: dataURI, mediaItemType: identifier.mediaItemType, appearance: appearance, resizeMode: resizeMode, dimensions: dimensions, actions: actions, selectable: selectable, selected: selected, onClick: onClick, onMouseEnter: onMouseEnter, onSelectChange: onSelectChange, disableOverlay: disableOverlay, progress: progress, onRetry: onRetry, previewOrientation: previewOrientation })));
            return isLazy ? (React.createElement(LazyContent, { placeholder: card, onRender: _this.onCardInViewport }, card)) : (card);
        };
        _this.onCardInViewport = function () {
            _this.setState({ isCardVisible: true }, function () {
                var _a = _this.props, identifier = _a.identifier, context = _a.context;
                _this.subscribe(identifier, context);
            });
        };
        return _this;
    }
    Card.prototype.componentDidMount = function () {
        var _a = this.props, identifier = _a.identifier, context = _a.context;
        this.hasBeenMounted = true;
        this.subscribe(identifier, context);
    };
    Card.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, currentContext = _a.context, currentIdentifier = _a.identifier, currentDimensions = _a.dimensions;
        var nextContext = nextProps.context, nextIdenfifier = nextProps.identifier, nextDimensions = nextProps.dimensions;
        var isDifferent = isDifferentIdentifier(currentIdentifier, nextIdenfifier);
        if (currentContext !== nextContext ||
            isDifferent ||
            this.shouldRefetchImage(currentDimensions, nextDimensions)) {
            this.subscribe(nextIdenfifier, nextContext);
        }
    };
    Card.prototype.componentWillUnmount = function () {
        this.hasBeenMounted = false;
        this.unsubscribe();
        this.releaseDataURI();
    };
    Card.prototype.subscribe = function (identifier, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isCardVisible, dataURI, name_1, id, collectionName, occurrenceKey, resolvedId;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isCardVisible = this.state.isCardVisible;
                        if (!isCardVisible) {
                            return [2 /*return*/];
                        }
                        if (identifier.mediaItemType === 'external-image') {
                            dataURI = identifier.dataURI, name_1 = identifier.name;
                            this.setState({
                                status: 'complete',
                                dataURI: dataURI,
                                metadata: {
                                    id: dataURI,
                                    name: name_1 || dataURI,
                                    mediaType: 'image',
                                },
                            });
                            return [2 /*return*/];
                        }
                        id = identifier.id, collectionName = identifier.collectionName, occurrenceKey = identifier.occurrenceKey;
                        return [4 /*yield*/, id];
                    case 1:
                        resolvedId = _a.sent();
                        this.unsubscribe();
                        this.subscription = context.file
                            .getFileState(resolvedId, { collectionName: collectionName, occurrenceKey: occurrenceKey })
                            .subscribe({
                            next: function (fileState) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var currentDataURI, _a, src, previewOrientation, _b, progress, _c, appearance, dimensions, resizeMode, options, width, height, mode, blob, dataURI, e_1;
                                return tslib_1.__generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            currentDataURI = this.state.dataURI;
                                            // const { metadata: currentMetadata } = this.state;
                                            // const metadata = extendMetadata(
                                            //   fileState,
                                            //   currentMetadata as FileDetails,
                                            // );
                                            console.log(fileState);
                                            if (!!currentDataURI) return [3 /*break*/, 2];
                                            return [4 /*yield*/, getDataURIFromFileState(fileState)];
                                        case 1:
                                            _a = _d.sent(), src = _a.src, previewOrientation = _a.orientation;
                                            currentDataURI = src;
                                            this.notifyStateChange({
                                                dataURI: currentDataURI,
                                                previewOrientation: previewOrientation,
                                            });
                                            _d.label = 2;
                                        case 2:
                                            _b = fileState.status;
                                            switch (_b) {
                                                case 'uploading': return [3 /*break*/, 3];
                                                case 'processing': return [3 /*break*/, 4];
                                                case 'processed': return [3 /*break*/, 5];
                                                case 'failed-processing': return [3 /*break*/, 10];
                                                case 'error': return [3 /*break*/, 11];
                                            }
                                            return [3 /*break*/, 12];
                                        case 3:
                                            progress = fileState.progress;
                                            this.notifyStateChange({
                                                status: 'uploading',
                                                progress: progress,
                                            });
                                            return [3 /*break*/, 12];
                                        case 4:
                                            if (currentDataURI) {
                                                this.notifyStateChange({
                                                    progress: 1,
                                                    status: 'complete',
                                                });
                                            }
                                            else {
                                                this.notifyStateChange({
                                                    status: 'processing',
                                                });
                                            }
                                            return [3 /*break*/, 12];
                                        case 5:
                                            if (!!currentDataURI) return [3 /*break*/, 9];
                                            _c = this.props, appearance = _c.appearance, dimensions = _c.dimensions, resizeMode = _c.resizeMode;
                                            options = {
                                                appearance: appearance,
                                                dimensions: dimensions,
                                                component: this,
                                            };
                                            width = getDataURIDimension('width', options);
                                            height = getDataURIDimension('height', options);
                                            _d.label = 6;
                                        case 6:
                                            _d.trys.push([6, 8, , 9]);
                                            mode = resizeMode === 'stretchy-fit' ? 'full-fit' : resizeMode;
                                            return [4 /*yield*/, context.getImage(resolvedId, {
                                                    collection: collectionName,
                                                    mode: mode,
                                                    height: height,
                                                    width: width,
                                                    allowAnimated: true,
                                                })];
                                        case 7:
                                            blob = _d.sent();
                                            dataURI = URL.createObjectURL(blob);
                                            this.releaseDataURI();
                                            if (this.hasBeenMounted) {
                                                this.setState({ dataURI: dataURI });
                                            }
                                            return [3 /*break*/, 9];
                                        case 8:
                                            e_1 = _d.sent();
                                            return [3 /*break*/, 9];
                                        case 9:
                                            this.notifyStateChange({ status: 'complete' });
                                            return [3 /*break*/, 12];
                                        case 10:
                                            this.notifyStateChange({ status: 'failed-processing' });
                                            return [3 /*break*/, 12];
                                        case 11:
                                            this.notifyStateChange({ status: 'error' });
                                            _d.label = 12;
                                        case 12: return [2 /*return*/];
                                    }
                                });
                            }); },
                            error: function (error) {
                                console.log(error);
                                _this.notifyStateChange({ error: error, status: 'error' });
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Card.prototype, "analyticsContext", {
        get: function () {
            var identifier = this.props.identifier;
            var id = isExternalImageIdentifier(identifier)
                ? 'external-image'
                : identifier.id;
            return getBaseAnalyticsContext('Card', id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "actions", {
        get: function () {
            var _this = this;
            var _a = this.props, _b = _a.actions, actions = _b === void 0 ? [] : _b, identifier = _a.identifier;
            var _c = this.state, status = _c.status, metadata = _c.metadata;
            if (isFileIdentifier(identifier) && status === 'failed-processing') {
                actions.unshift({
                    label: 'Download',
                    icon: React.createElement(DownloadIcon, { label: "Download" }),
                    handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = this.props.context.file).downloadBinary;
                                    return [4 /*yield*/, identifier.id];
                                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                        metadata.name,
                                        identifier.collectionName])];
                            }
                        });
                    }); },
                });
            }
            return actions;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.render = function () {
        var isPlayingFile = this.state.isPlayingFile;
        var content = isPlayingFile
            ? this.renderInlinePlayer()
            : this.renderCard();
        return this.context.intl ? (content) : (React.createElement(IntlProvider, { locale: "en" }, content));
    };
    Card.defaultProps = {
        appearance: 'auto',
        resizeMode: 'crop',
        isLazy: true,
        disableOverlay: false,
    };
    return Card;
}(Component));
export { Card };
//# sourceMappingURL=index.js.map