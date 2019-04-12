import * as tslib_1 from "tslib";
import * as React from 'react';
import { ItemViewer } from './item-viewer';
import { HeaderWrapper, hideControlsClassName, ListWrapper } from './styled';
import { getSelectedIndex } from './utils';
import ErrorMessage, { createError } from './error';
import { Navigation } from './navigation';
import Header from './header';
var List = /** @class */ (function (_super) {
    tslib_1.__extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedItem: _this.props.defaultSelectedItem,
            previewCount: 0,
        };
        _this.onNavigationChange = function (selectedItem) {
            var _a = _this.props, onNavigationChange = _a.onNavigationChange, showControls = _a.showControls;
            if (onNavigationChange) {
                onNavigationChange(selectedItem);
            }
            if (showControls) {
                showControls();
            }
            _this.setState({ selectedItem: selectedItem, previewCount: _this.state.previewCount + 1 });
        };
        return _this;
    }
    List.prototype.render = function () {
        var items = this.props.items;
        return this.renderContent(items);
    };
    List.prototype.renderContent = function (items) {
        var _a = this.props, context = _a.context, onClose = _a.onClose, featureFlags = _a.featureFlags, showControls = _a.showControls;
        var selectedItem = this.state.selectedItem;
        if (getSelectedIndex(items, selectedItem) < 0) {
            return React.createElement(ErrorMessage, { error: createError('idNotFound') });
        }
        else {
            return (React.createElement(ListWrapper, null,
                React.createElement(HeaderWrapper, { className: hideControlsClassName },
                    React.createElement(Header, { context: context, identifier: selectedItem, onClose: onClose })),
                React.createElement(ItemViewer, { featureFlags: featureFlags, context: context, identifier: selectedItem, showControls: showControls, onClose: onClose, previewCount: this.state.previewCount }),
                React.createElement(Navigation, { items: items, selectedItem: selectedItem, onChange: this.onNavigationChange })));
        }
    };
    return List;
}(React.Component));
export { List };
//# sourceMappingURL=list.js.map