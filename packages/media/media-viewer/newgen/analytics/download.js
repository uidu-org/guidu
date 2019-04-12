import * as tslib_1 from "tslib";
import { packageAttributes, fileStateToFileGasPayload, } from './index';
var getBasePayload = function (actionSubjectId) { return ({
    eventType: 'ui',
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: actionSubjectId,
}); };
var getBaseAttributes = function (fileState) { return (tslib_1.__assign({}, fileStateToFileGasPayload(fileState), { fileProcessingStatus: fileState.status }, packageAttributes)); };
var downloadEvent = function (fileState, actionSubjectId, failReason) {
    var basePayload = getBasePayload(actionSubjectId);
    var baseAttributes = failReason
        ? tslib_1.__assign({}, getBaseAttributes(fileState), { failReason: failReason }) : getBaseAttributes(fileState);
    switch (fileState.status) {
        case 'processed':
        case 'uploading':
        case 'processing':
        case 'failed-processing':
            return tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, baseAttributes, { fileSupported: fileState.mediaType !== 'unknown' }) });
        case 'error':
            return tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, baseAttributes) });
    }
};
export function downloadErrorButtonEvent(state, err) {
    return downloadEvent(state, 'failedPreviewDownloadButton', err.errorName);
}
export function downloadButtonEvent(state) {
    return downloadEvent(state, 'downloadButton');
}
//# sourceMappingURL=download.js.map