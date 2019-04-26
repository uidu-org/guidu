import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import DropdownMenu, { DropdownItemGroup, DropdownItem, } from '@uidu/dropdown-menu';
import RefreshIcon from '@atlaskit/icon/glyph/refresh';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { requestUnlinkCloudAccount, startAuth } from '../../actions';
import { changeCloudAccountFolder } from '../../actions/changeCloudAccountFolder';
import { changeAccount } from '../../actions/changeAccount';
import { FolderViewerNavigation, ControlsWrapper, Controls, ControlButton, BreadCrumbs, BreadCrumbLink, BreadCrumbLinkLabel, BreadCrumbLinkSeparator, AccountItemButton, AccountDropdownWrapper, } from './styled';
var SERVICENAME = {
    dropbox: 'Dropbox',
    google: 'Google Drive',
};
var Navigation = /** @class */ (function (_super) {
    tslib_1.__extends(Navigation, _super);
    function Navigation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdownOpen: false,
            availableAccounts: [],
        };
        _this.onRefreshButtonClick = function () {
            var _a = _this.props, service = _a.service, path = _a.path, onChangePath = _a.onChangePath;
            onChangePath(service.name, service.accountId, path);
        };
        _this.onChangeAccountHandler = function (type, id) { return function () {
            var onChangeAccount = _this.props.onChangeAccount;
            onChangeAccount(type, id);
        }; };
        _this.onUnlinkAccountHandler = function (name, accountId) { return function () {
            var onUnlinkAccount = _this.props.onUnlinkAccount;
            onUnlinkAccount(name, accountId);
        }; };
        _this.onStartAuthHandler = function (name) { return function () {
            var onStartAuth = _this.props.onStartAuth;
            onStartAuth(name);
        }; };
        _this.handleOpenChange = function (attrs) {
            _this.setState({ dropdownOpen: attrs.isOpen });
        };
        return _this;
    }
    Navigation.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, accounts, service, availableAccounts;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, accounts = _a.accounts, service = _a.service;
                        return [4 /*yield*/, accounts];
                    case 1:
                        availableAccounts = (_b.sent()).filter(function (account) { return account.type === service.name; });
                        this.setState({
                            availableAccounts: availableAccounts,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Navigation.prototype.componentDidUpdate = function (prevProps) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, accounts, service, availableAccounts;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, accounts = _a.accounts, service = _a.service;
                        if (!(prevProps.service !== service)) return [3 /*break*/, 2];
                        return [4 /*yield*/, accounts];
                    case 1:
                        availableAccounts = (_b.sent()).filter(function (account) { return account.type === service.name; });
                        this.setState({
                            availableAccounts: availableAccounts,
                        });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Navigation.prototype.render = function () {
        var _a = this.props, service = _a.service, path = _a.path;
        var breadcrumbs = this.generateBreadcrumbs(service, path);
        var accountsDropdown = this.getAccountsDropdown();
        return (React.createElement(FolderViewerNavigation, null,
            breadcrumbs,
            React.createElement(ControlsWrapper, null,
                React.createElement(Controls, null,
                    React.createElement(ControlButton, { onClick: this.onRefreshButtonClick, iconBefore: React.createElement(RefreshIcon, { label: "refresh" }) }),
                    accountsDropdown))));
    };
    Navigation.prototype.getAccountButton = function () {
        var dropdownOpen = this.state.dropdownOpen;
        return (React.createElement(AccountItemButton, { isSelected: dropdownOpen, iconBefore: React.createElement(SettingsIcon, { label: "account settings" }) }));
    };
    Navigation.prototype.getAccountsDropdownItems = function () {
        var _this = this;
        var _a = this.props, service = _a.service, formatMessage = _a.intl.formatMessage;
        var availableAccounts = this.state.availableAccounts;
        var dropdownAccountItems = availableAccounts.map(function (_a) {
            var id = _a.id, displayName = _a.displayName, type = _a.type;
            return (React.createElement(DropdownItem, { key: id, onClick: _this.onChangeAccountHandler(type, id) }, id === service.accountId ? React.createElement("b", null, displayName) : displayName));
        });
        var dropdownActionItems = [
            React.createElement(DropdownItem, { key: "add", onClick: this.onStartAuthHandler(service.name) },
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.add_account))),
            React.createElement(DropdownItem, { key: "unlink", onClick: this.onUnlinkAccountHandler(service.name, service.accountId) },
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.unlink_account))),
        ];
        return [
            React.createElement(DropdownItemGroup, { key: "accounts", title: formatMessage(messages.accounts) }, dropdownAccountItems),
            React.createElement(DropdownItemGroup, { key: "actions", title: formatMessage(messages.actions) }, dropdownActionItems),
        ];
    };
    Navigation.prototype.getAccountsDropdown = function () {
        var items = this.getAccountsDropdownItems();
        return (React.createElement(AccountDropdownWrapper, null,
            React.createElement(DropdownMenu, { onOpenChange: this.handleOpenChange, trigger: this.getAccountButton(), position: "bottom right" }, items)));
    };
    Navigation.prototype.generateBreadcrumbs = function (service, path) {
        var _this = this;
        var serviceName = SERVICENAME[service.name] || service.name;
        var fullPath = [{ id: '', name: serviceName }].concat(path);
        var breadcrumbs = fullPath
            .slice(-2)
            .map(function (folderReference) {
            var index = fullPath.indexOf(folderReference);
            return fullPath.slice(0, index + 1);
        })
            .map(function (path, index, allPaths) {
            var isLast = index === allPaths.length - 1;
            return _this.renderBreadcrumb(service, path, isLast);
        });
        return React.createElement(BreadCrumbs, null, breadcrumbs);
    };
    Navigation.prototype.renderBreadcrumb = function (service, path, isLast) {
        var onChangePath = this.props.onChangePath;
        if (path.length === 0) {
            return null;
        }
        var folder = path[path.length - 1];
        var onClick = function () {
            return onChangePath(service.name, service.accountId, path.slice(1));
        };
        return (React.createElement(BreadCrumbLink, { key: folder.id, onClick: onClick, isLast: isLast },
            React.createElement(BreadCrumbLinkLabel, { title: folder.name, isLast: isLast }, folder.name),
            React.createElement(BreadCrumbLinkSeparator, { isLast: isLast }, "/")));
    };
    return Navigation;
}(Component));
export { Navigation };
export default connect(function (_a) {
    var accounts = _a.accounts, view = _a.view;
    return ({
        accounts: accounts,
        path: view.path,
        service: view.service,
    });
}, function (dispatch) { return ({
    onChangeAccount: function (serviceName, accountId) {
        return dispatch(changeAccount(serviceName, accountId));
    },
    onChangePath: function (serviceName, accountId, path) {
        return dispatch(changeCloudAccountFolder(serviceName, accountId, tslib_1.__spread(path)));
    },
    onStartAuth: function (serviceName) { return dispatch(startAuth(serviceName)); },
    onUnlinkAccount: function (serviceName, accountId) {
        return dispatch(requestUnlinkCloudAccount({
            id: accountId,
            name: serviceName,
        }));
    },
}); })(injectIntl(Navigation));
//# sourceMappingURL=navigation.js.map