import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { Wrapper, InsertButton, CancelButton } from './styled';
import { startImport, hidePopup } from '../../actions';
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.renderCancelButton = function () {
        var _a = this.props, canCancel = _a.canCancel, onCancel = _a.onCancel;
        return (React.createElement(CancelButton, { appearance: "subtle", onClick: onCancel, isDisabled: !canCancel },
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.cancel))));
    };
    Footer.prototype.renderInsertButton = function () {
        var _a = this.props, selectedItems = _a.selectedItems, canInsert = _a.canInsert, onInsert = _a.onInsert;
        var itemCount = selectedItems.length;
        if (itemCount === 0) {
            return null;
        }
        var onClick = function () { return onInsert(selectedItems); };
        return (React.createElement(InsertButton, { className: "e2e-insert-button", appearance: "primary", onClick: onClick, isDisabled: !canInsert },
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.insert_files, { values: {
                    0: itemCount,
                } }))));
    };
    Footer.prototype.render = function () {
        return (React.createElement(Wrapper, null,
            this.renderInsertButton(),
            this.renderCancelButton()));
    };
    return Footer;
}(Component));
export { Footer };
var mapStateToProps = function (_a) {
    var isUploading = _a.isUploading, isCancelling = _a.isCancelling, selectedItems = _a.selectedItems;
    var isUploadingOrCancelling = isUploading || isCancelling;
    return {
        selectedItems: selectedItems,
        canInsert: !isUploadingOrCancelling,
        canCancel: !isUploadingOrCancelling,
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    onInsert: function () { return dispatch(startImport()); },
    onCancel: function () { return dispatch(hidePopup()); },
}); };
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
//# sourceMappingURL=footer.js.map