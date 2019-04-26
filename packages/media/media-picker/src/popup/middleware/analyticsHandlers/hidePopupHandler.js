import * as tslib_1 from "tslib";
import { isHidePopupAction } from '../../actions/hidePopup';
import { buttonClickPayload } from '.';
export default (function (action, store) {
    if (isHidePopupAction(action)) {
        return [
            tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: store.getState().selectedItems.length > 0
                    ? 'insertFilesButton'
                    : 'cancelButton', attributes: {
                    fileCount: store.getState().selectedItems.length,
                } }),
        ];
    }
});
//# sourceMappingURL=hidePopupHandler.js.map