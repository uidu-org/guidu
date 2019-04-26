import * as tslib_1 from "tslib";
import { isEditRemoteImageAction } from '../../actions/editRemoteImage';
import { buttonClickPayload } from '.';
export default (function (action) {
    if (isEditRemoteImageAction(action)) {
        return [
            tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: 'annotateFileButton' }),
        ];
    }
});
//# sourceMappingURL=editRemoteImageHandler.js.map