import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { MediaViewer as MediaViewerNextGen } from '../newgen/media-viewer';
var MediaViewer = /** @class */ (function (_super) {
    tslib_1.__extends(MediaViewer, _super);
    function MediaViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaViewer.prototype.render = function () {
        var _a = this.props, featureFlags = _a.featureFlags, onClose = _a.onClose, context = _a.context, selectedItem = _a.selectedItem, collectionName = _a.collectionName, dataSource = _a.dataSource, pageSize = _a.pageSize;
        var defaultPageSize = 30;
        if (dataSource.list) {
            var items = dataSource.list.map(function (i) { return (tslib_1.__assign({}, i, { collectionName: collectionName })); });
            var itemSource = {
                kind: 'ARRAY',
                items: items,
            };
            var identifier = tslib_1.__assign({}, selectedItem, { collectionName: collectionName });
            return (React.createElement(MediaViewerNextGen, { context: context, selectedItem: identifier, onClose: onClose, itemSource: itemSource, featureFlags: featureFlags }));
        }
        else if (dataSource.collectionName) {
            var itemSource = {
                kind: 'COLLECTION',
                collectionName: dataSource.collectionName,
                pageSize: pageSize || defaultPageSize,
            };
            var identifier = tslib_1.__assign({}, selectedItem, { collectionName: dataSource.collectionName });
            return (React.createElement(MediaViewerNextGen, { context: context, selectedItem: identifier, onClose: onClose, itemSource: itemSource, featureFlags: featureFlags }));
        }
        else {
            throw new Error();
        }
    };
    return MediaViewer;
}(Component));
export { MediaViewer };
//# sourceMappingURL=media-viewer.js.map