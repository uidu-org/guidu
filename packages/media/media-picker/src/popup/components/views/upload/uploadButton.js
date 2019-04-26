import * as tslib_1 from "tslib";
import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@uidu/button';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { startFileBrowser } from '../../../actions/startFileBrowser';
var LocalBrowserButton = /** @class */ (function (_super) {
    tslib_1.__extends(LocalBrowserButton, _super);
    function LocalBrowserButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUploadClick = function () {
            var _a = _this.props, mpBrowser = _a.mpBrowser, onClick = _a.onClick;
            onClick();
            if (mpBrowser) {
                mpBrowser.browse();
            }
        };
        return _this;
    }
    LocalBrowserButton.prototype.render = function () {
        var mpBrowser = this.props.mpBrowser;
        return (React.createElement(Button, { className: "e2e-upload-button", appearance: "default", onClick: this.onUploadClick, isDisabled: !mpBrowser },
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.upload_file))));
    };
    return LocalBrowserButton;
}(React.Component));
export { LocalBrowserButton };
var mapDispatchToProps = function (dispatch) { return ({
    onClick: function () { return dispatch(startFileBrowser()); },
}); };
export default connect(null, mapDispatchToProps)(LocalBrowserButton);
//# sourceMappingURL=uploadButton.js.map