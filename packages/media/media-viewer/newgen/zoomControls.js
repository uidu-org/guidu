import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import Button from '@uidu/button';
import ZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out';
import ZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in';
import { ZoomWrapper, ZoomControlsWrapper, hideControlsClassName, ZoomLevelIndicator, } from './styled';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { channel } from './analytics';
import { createZoomEvent } from './analytics/zoom';
import { injectIntl } from 'react-intl';
import { messages } from '@uidu/media-ui';
var ZoomControlsBase = /** @class */ (function (_super) {
    tslib_1.__extends(ZoomControlsBase, _super);
    function ZoomControlsBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zoomIn = function () {
            var _a = _this.props, onChange = _a.onChange, zoomLevel = _a.zoomLevel;
            if (zoomLevel.canZoomIn) {
                var zoom = zoomLevel.zoomIn();
                _this.fireAnalytics(createZoomEvent('zoomIn', zoom.value));
                onChange(zoom);
            }
        };
        _this.zoomOut = function () {
            var _a = _this.props, onChange = _a.onChange, zoomLevel = _a.zoomLevel;
            if (zoomLevel.canZoomOut) {
                var zoom = zoomLevel.zoomOut();
                _this.fireAnalytics(createZoomEvent('zoomOut', zoom.value));
                onChange(zoom);
            }
        };
        _this.fireAnalytics = function (payload) {
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                var ev = createAnalyticsEvent(payload);
                ev.fire(channel);
            }
        };
        return _this;
    }
    ZoomControlsBase.prototype.render = function () {
        var _a = this.props, zoomLevel = _a.zoomLevel, formatMessage = _a.intl.formatMessage;
        return (React.createElement(ZoomWrapper, { className: hideControlsClassName },
            React.createElement(ZoomControlsWrapper, null,
                React.createElement(Button, { appearance: 'toolbar', isDisabled: !zoomLevel.canZoomOut, onClick: this.zoomOut, iconBefore: React.createElement(ZoomOutIcon, { label: formatMessage(messages.zoom_out) }) }),
                React.createElement(Button, { appearance: 'toolbar', isDisabled: !zoomLevel.canZoomIn, onClick: this.zoomIn, iconBefore: React.createElement(ZoomInIcon, { label: formatMessage(messages.zoom_in) }) })),
            React.createElement(ZoomLevelIndicator, null, zoomLevel.asPercentage)));
    };
    return ZoomControlsBase;
}(Component));
export { ZoomControlsBase };
export var ZoomControls = withAnalyticsEvents({})(injectIntl(ZoomControlsBase));
//# sourceMappingURL=zoomControls.js.map