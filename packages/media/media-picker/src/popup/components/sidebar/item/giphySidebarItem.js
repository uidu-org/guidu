import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { changeService, searchGiphy } from '../../../actions';
import { StatelessSidebarItem } from './sidebarItem';
import { GiphyIcon } from '../icons';
var StatelessGiphySidebarItem = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessGiphySidebarItem, _super);
    function StatelessGiphySidebarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessGiphySidebarItem.prototype.render = function () {
        var _a = this.props, isActive = _a.isActive, onChangeService = _a.onChangeService;
        return (React.createElement(StatelessSidebarItem, { serviceName: "giphy", serviceFullName: "GIPHY", isActive: isActive, onChangeService: onChangeService },
            React.createElement(GiphyIcon, { active: isActive })));
    };
    return StatelessGiphySidebarItem;
}(Component));
export { StatelessGiphySidebarItem };
var mapDispatchToProps = function (dispatch) { return ({
    onChangeService: function () {
        dispatch(changeService('giphy'));
        dispatch(searchGiphy('', false));
    },
}); };
export default connect(null, mapDispatchToProps)(StatelessGiphySidebarItem);
//# sourceMappingURL=giphySidebarItem.js.map