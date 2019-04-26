import * as tslib_1 from "tslib";
export var FILE_CLICK = 'FILE_CLICK';
export function isFileClickAction(action) {
    return action.type === FILE_CLICK;
}
export function fileClick(file, serviceName, accountId) {
    return {
        type: FILE_CLICK,
        file: tslib_1.__assign({}, file, { accountId: accountId,
            serviceName: serviceName }),
    };
}
//# sourceMappingURL=fileClick.js.map