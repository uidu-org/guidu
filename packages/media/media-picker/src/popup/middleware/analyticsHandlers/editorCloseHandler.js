import * as tslib_1 from "tslib";
import { isEditorCloseAction } from '../../actions/editorClose';
import { buttonClickPayload } from '.';
export default (function (action) {
    if (isEditorCloseAction(action)) {
        return [
            tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: "mediaEditor" + action.selection + "Button" }),
        ];
    }
});
//# sourceMappingURL=editorCloseHandler.js.map