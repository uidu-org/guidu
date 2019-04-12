import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { InlinePlayerWrapper } from './styled';
import { defaultImageCardDimensions } from '..';
import { CardLoading } from '../utils/cardLoading';
var InlinePlayer = /** @class */ (function (_super) {
    tslib_1.__extends(InlinePlayer, _super);
    function InlinePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.unsubscribe = function () {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
        };
        _this.revoke = function () {
            var fileSrc = _this.state.fileSrc;
            if (fileSrc) {
                URL.revokeObjectURL(fileSrc);
            }
        };
        _this.getStyle = function () {
            var dimensions = _this.props.dimensions;
            // We are given dimensions. But we can’t just blindly apply them as width and height.
            // Because editor is giving us “maximum” dimensions (equal to what it can go to if resized to 100%
            // of available width). And the same time we don’t want to ignore these dimensions completely,
            // because if consumer do not constraint width/height of container we still want to stick to given dimensions.
            // Here we put width as a style. In combination with max-width: 100%; and max-height: 100%;
            // it would give us required effect.
            return {
                width: dimensions.width,
            };
        };
        return _this;
    }
    InlinePlayer.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, context, identifier, id, collectionName, _b, _c, _d;
            var _this = this;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.props, context = _a.context, identifier = _a.identifier;
                        id = identifier.id, collectionName = identifier.collectionName;
                        this.revoke();
                        this.unsubscribe();
                        _b = this;
                        _d = (_c = context.file).getFileState;
                        return [4 /*yield*/, id];
                    case 1:
                        _b.subscription = _d.apply(_c, [_e.sent(), { collectionName: collectionName }])
                            .subscribe({
                            next: function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var value, fileSrc, artifacts, preferedArtifact, fileSrc, error_1, onError;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(state.status !== 'error' && state.preview)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, state.preview];
                                        case 1:
                                            value = (_a.sent()).value;
                                            if (value instanceof Blob && value.type.indexOf('video/') === 0) {
                                                fileSrc = URL.createObjectURL(value);
                                                this.setState({ fileSrc: fileSrc });
                                                window.setTimeout(this.unsubscribe, 0);
                                                return [2 /*return*/];
                                            }
                                            _a.label = 2;
                                        case 2:
                                            if (!(state.status === 'processed')) return [3 /*break*/, 6];
                                            artifacts = state.artifacts;
                                            _a.label = 3;
                                        case 3:
                                            _a.trys.push([3, 5, , 6]);
                                            preferedArtifact = artifacts['video_1280.mp4']
                                                ? 'video_1280.mp4'
                                                : 'video_640.mp4';
                                            return [4 /*yield*/, context.file.getArtifactURL(artifacts, preferedArtifact, collectionName)];
                                        case 4:
                                            fileSrc = _a.sent();
                                            this.setState({ fileSrc: fileSrc });
                                            window.setTimeout(this.unsubscribe, 0);
                                            return [3 /*break*/, 6];
                                        case 5:
                                            error_1 = _a.sent();
                                            onError = this.props.onError;
                                            if (onError) {
                                                onError(error_1);
                                            }
                                            return [3 /*break*/, 6];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    InlinePlayer.prototype.componentWillUnmount = function () {
        this.unsubscribe();
        this.revoke();
    };
    InlinePlayer.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, dimensions = _a.dimensions, selected = _a.selected;
        var fileSrc = this.state.fileSrc;
        if (!fileSrc) {
            return React.createElement(CardLoading, { dimensions: dimensions });
        }
        return (React.createElement(InlinePlayerWrapper, { style: this.getStyle(), selected: selected, onClick: onClick },
            React.createElement(CustomMediaPlayer, { type: "video", src: fileSrc, isAutoPlay: true, isHDAvailable: false })));
    };
    InlinePlayer.defaultProps = {
        dimensions: defaultImageCardDimensions,
    };
    return InlinePlayer;
}(Component));
export { InlinePlayer };
//# sourceMappingURL=inlinePlayer.js.map