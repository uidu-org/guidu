import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import FolderViewer from './folderView/folderView';
import Auth from './auth/auth';
import { Wrapper } from './styled';
var Browser = /** @class */ (function (_super) {
    tslib_1.__extends(Browser, _super);
    function Browser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Browser.prototype.render = function () {
        var service = this.props.service;
        var view = service.accountId ? React.createElement(FolderViewer, null) : React.createElement(Auth, null);
        return React.createElement(Wrapper, null, view);
    };
    return Browser;
}(Component));
export { Browser };
export default connect(function (_a) {
    var service = _a.view.service;
    return ({
        service: service,
    });
})(Browser);
//# sourceMappingURL=browser.js.map