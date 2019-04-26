import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import AkButton from '@uidu/button';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogledriveIcon from '@atlaskit/icon/glyph/googledrive';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { startAuth } from '../../../../actions';
import { ButtonWrapper, ConnectWrapper, IconWrapper, TextDescription, Title, } from './styled';
var serviceDetails = {
    dropbox: {
        name: 'Dropbox',
        icon: React.createElement(DropboxIcon, { label: "dropbox", size: "xlarge" }),
    },
    google: {
        name: 'Google Drive',
        icon: React.createElement(GoogledriveIcon, { label: "drive", size: "xlarge" }),
    },
};
/**
 * Routing class that displays view depending on situation.
 */
var StatelessAuth = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessAuth, _super);
    function StatelessAuth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { return _this.props.onStartAuth(_this.props.service.name); };
        return _this;
    }
    StatelessAuth.prototype.render = function () {
        var service = this.props.service;
        var details = serviceDetails[service.name];
        if (!details) {
            return null;
        }
        var name = details.name, icon = details.icon;
        return (React.createElement(ConnectWrapper, null,
            React.createElement(Title, null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.upload_file_from, { values: { name: name } }))),
            React.createElement(IconWrapper, null, icon),
            React.createElement(ButtonWrapper, null,
                React.createElement(AkButton, { appearance: "primary", className: "connectBtn", onClick: this.onClick },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.connect_to, { values: { name: name } })))),
            React.createElement(TextDescription, null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.connect_account_description, { values: { name: name } })))));
    };
    return StatelessAuth;
}(Component));
export { StatelessAuth };
export default connect(function (state) { return ({
    service: state.view.service,
}); }, function (dispatch) { return ({
    onStartAuth: function (serviceName) { return dispatch(startAuth(serviceName)); },
}); })(StatelessAuth);
//# sourceMappingURL=auth.js.map