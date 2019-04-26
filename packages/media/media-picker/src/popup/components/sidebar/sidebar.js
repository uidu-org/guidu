import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import UploadIcon from '@atlaskit/icon/glyph/upload';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogleDriveIcon from '@atlaskit/icon/glyph/googledrive';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import SidebarItem from './item/sidebarItem';
import GiphySidebarItem from './item/giphySidebarItem';
import { Wrapper, ServiceList, Separator, SeparatorLine } from './styled';
var StatelessSidebar = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessSidebar, _super);
    function StatelessSidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getCloudPickingSidebarItems = function () {
            var selected = _this.props.selected;
            return [
                React.createElement(Separator, { key: "seperator" },
                    React.createElement(SeparatorLine, null)),
                React.createElement(GiphySidebarItem, { key: "giphy", isActive: selected === 'giphy' }),
                React.createElement(SidebarItem, { key: "dropbox", serviceName: "dropbox", serviceFullName: "Dropbox", isActive: selected === 'dropbox' },
                    React.createElement(DropboxIcon, { label: "dropbox" })),
                React.createElement(SidebarItem, { key: "google", serviceName: "google", serviceFullName: "Google Drive", isActive: selected === 'google' },
                    React.createElement(GoogleDriveIcon, { label: "google" })),
            ];
        };
        return _this;
    }
    StatelessSidebar.prototype.render = function () {
        var selected = this.props.selected;
        return (React.createElement(Wrapper, null,
            React.createElement(ServiceList, null,
                React.createElement(SidebarItem, { serviceName: "upload", serviceFullName: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.upload)), isActive: selected === 'upload' },
                    React.createElement(UploadIcon, { label: "upload" })),
                this.getCloudPickingSidebarItems())));
    };
    return StatelessSidebar;
}(Component));
export { StatelessSidebar };
export default connect(function (state) { return ({
    selected: state.view.service.name,
}); })(StatelessSidebar);
//# sourceMappingURL=sidebar.js.map