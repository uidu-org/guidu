import * as tslib_1 from "tslib";
// Simple component which wraps stories and creates a styled list out of it
import * as React from 'react';
import { Component } from 'react';
var styles = {
    column: {
        statesWrapper: {
            listStyle: 'none',
            padding: '10px',
            margin: '10px',
            borderRadius: '3px',
            display: 'inline-block',
        },
        stateItem: {
            // TODO: From AK2 migration – TypeScript error, doesn't make sense
            flexDirection: 'column',
            borderRadius: '3px',
            padding: '10px',
            margin: '10px',
        },
        stateTitle: {
            borderBottom: '1px solid #ccc',
            marginBottom: '7px',
            color: '#606369',
            width: '100%',
            textTransform: 'capitalize',
        },
    },
    row: {
        statesWrapper: {
            listStyle: 'none',
            padding: '10px',
            margin: '10px',
            borderRadius: '3px',
        },
        stateItem: {
            display: 'inline-flex',
            // TODO: From AK2 migration – TypeScript error, doesn't make sense
            flexDirection: 'column',
            borderRadius: '3px',
            padding: '10px',
            margin: '10px',
        },
        stateTitle: {
            borderBottom: '1px solid #ccc',
            marginBottom: '7px',
            color: '#606369',
            width: '100%',
            textTransform: 'capitalize',
        },
    },
};
var StoryList = /** @class */ (function (_super) {
    tslib_1.__extends(StoryList, _super);
    function StoryList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoryList.prototype.render = function () {
        var _a = this.props, _b = _a.display, display = _b === void 0 ? 'row' : _b, _c = _a.children, children = _c === void 0 ? [] : _c;
        var listStyles = display === 'column' ? styles.column : styles.row;
        var listContent = children.map(function (child, index) {
            return (React.createElement("li", { style: listStyles.stateItem, key: index },
                React.createElement("div", { style: listStyles.stateTitle }, child.title),
                child.content));
        });
        return React.createElement("ul", { style: listStyles.statesWrapper }, listContent);
    };
    return StoryList;
}(Component));
export { StoryList };
//# sourceMappingURL=story-list.js.map