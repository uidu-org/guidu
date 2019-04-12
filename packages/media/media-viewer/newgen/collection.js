import * as tslib_1 from "tslib";
import * as React from 'react';
import { Outcome } from './domain';
import ErrorMessage, { createError } from './error';
import { List } from './list';
import { toIdentifier } from './utils';
import { Spinner } from './loading';
var initialState = { items: Outcome.pending() };
var Collection = /** @class */ (function (_super) {
    tslib_1.__extends(Collection, _super);
    function Collection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = initialState;
        _this.onNavigationChange = function (item) {
            var _a = _this.props, context = _a.context, collectionName = _a.collectionName, pageSize = _a.pageSize;
            if (_this.shouldLoadNext(item)) {
                context.collection.loadNextPage(collectionName, {
                    limit: pageSize,
                });
            }
        };
        return _this;
    }
    Collection.prototype.componentWillUpdate = function (nextProps) {
        if (this.needsReset(this.props, nextProps)) {
            this.release();
            this.init(nextProps);
        }
    };
    Collection.prototype.componentWillUnmount = function () {
        this.release();
    };
    Collection.prototype.componentDidMount = function () {
        this.init(this.props);
    };
    Collection.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultSelectedItem = _a.defaultSelectedItem, context = _a.context, onClose = _a.onClose, collectionName = _a.collectionName, showControls = _a.showControls;
        return this.state.items.match({
            pending: function () { return React.createElement(Spinner, null); },
            successful: function (items) {
                var identifiers = items.map(function (x) { return toIdentifier(x, collectionName); });
                var item = defaultSelectedItem
                    ? tslib_1.__assign({}, defaultSelectedItem, { collectionName: collectionName }) : identifiers[0];
                return (React.createElement(List, { items: identifiers, defaultSelectedItem: item, context: context, onClose: onClose, onNavigationChange: _this.onNavigationChange, showControls: showControls }));
            },
            failed: function (err) { return React.createElement(ErrorMessage, { error: err }); },
        });
    };
    Collection.prototype.init = function (props) {
        var _this = this;
        this.setState(initialState);
        var collectionName = props.collectionName, context = props.context, defaultSelectedItem = props.defaultSelectedItem, pageSize = props.pageSize;
        this.subscription = context.collection
            .getItems(collectionName, { limit: pageSize })
            .subscribe({
            next: function (items) {
                _this.setState({
                    items: Outcome.successful(items),
                });
                if (defaultSelectedItem && _this.shouldLoadNext(defaultSelectedItem)) {
                    context.collection.loadNextPage(collectionName, {
                        limit: pageSize,
                    });
                }
            },
            error: function () {
                _this.setState({
                    items: Outcome.failed(createError('metadataFailed')),
                });
            },
        });
    };
    Collection.prototype.release = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Collection.prototype.needsReset = function (propsA, propsB) {
        return (propsA.collectionName !== propsB.collectionName ||
            propsA.context !== propsB.context);
    };
    Collection.prototype.shouldLoadNext = function (selectedItem) {
        var _this = this;
        var items = this.state.items;
        return items.match({
            pending: function () { return false; },
            failed: function () { return false; },
            successful: function (items) {
                return items.length !== 0 && _this.isLastItem(selectedItem, items);
            },
        });
    };
    Collection.prototype.isLastItem = function (selectedItem, items) {
        var lastItem = items[items.length - 1];
        var isLastItem = selectedItem.id === lastItem.id &&
            selectedItem.occurrenceKey === lastItem.occurrenceKey;
        return isLastItem;
    };
    return Collection;
}(React.Component));
export { Collection };
//# sourceMappingURL=collection.js.map