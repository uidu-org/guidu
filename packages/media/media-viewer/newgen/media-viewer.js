import * as tslib_1 from "tslib";
import * as React from 'react';
import { isFileIdentifier, } from '@uidu/media-core';
import { IntlProvider, intlShape } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { Shortcut, theme } from '@uidu/media-ui';
import { withAnalyticsEvents } from '@uidu/analytics';
import { mediaViewerModalEvent } from './analytics/media-viewer';
import { channel } from './analytics/index';
import { List } from './list';
import { Collection } from './collection';
import { Content } from './content';
import { Blanket } from './styled';
var MediaViewerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MediaViewerComponent, _super);
    function MediaViewerComponent() {
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
    MediaViewerComponent.prototype.componentWillMount = function () {
        this.fireAnalytics(mediaViewerModalEvent());
    };
    MediaViewerComponent.prototype.render = function () {
        var onClose = this.props.onClose;
        var content = (React.createElement(ThemeProvider, { theme: theme },
            React.createElement(Blanket, null,
                onClose && React.createElement(Shortcut, { keyCode: 27, handler: onClose }),
                React.createElement(Content, { onClose: onClose }, this.renderContent()))));
        return this.context.intl ? (content) : (React.createElement(IntlProvider, { locale: "en" }, content));
    };
    MediaViewerComponent.prototype.renderContent = function () {
        var _a = this.props, selectedItem = _a.selectedItem, context = _a.context, onClose = _a.onClose, itemSource = _a.itemSource, featureFlags = _a.featureFlags;
        var defaultSelectedItem = selectedItem && isFileIdentifier(selectedItem) ? selectedItem : undefined;
        if (itemSource.kind === 'COLLECTION') {
            return (React.createElement(Collection, { pageSize: itemSource.pageSize, defaultSelectedItem: defaultSelectedItem, collectionName: itemSource.collectionName, context: context, onClose: onClose, featureFlags: featureFlags }));
        }
        else if (itemSource.kind === 'ARRAY') {
            var items = itemSource.items.filter(function (item) {
                return isFileIdentifier(item);
            });
            var firstItem = items[0];
            return (React.createElement(List, { defaultSelectedItem: defaultSelectedItem || firstItem, items: items, context: context, onClose: onClose, featureFlags: featureFlags }));
        }
        else {
            return null;
        }
    };
    MediaViewerComponent.contextTypes = {
        intl: intlShape,
    };
    return MediaViewerComponent;
}(React.Component));
export var MediaViewer = withAnalyticsEvents()(MediaViewerComponent);
//# sourceMappingURL=media-viewer.js.map