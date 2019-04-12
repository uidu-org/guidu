import * as tslib_1 from "tslib";
import { name as packageName, version as packageVersion, } from '../../version.json';
export var channel = 'media';
export var packageAttributes = {
    componentName: 'media-viewer',
    packageName: packageName,
    packageVersion: packageVersion,
};
export function fileStateToFileGasPayload(state) {
    var basePayload = {
        fileId: state.id,
    };
    switch (state.status) {
        case 'uploading':
        case 'failed-processing':
        case 'processing':
        case 'processed':
            return tslib_1.__assign({}, basePayload, { fileMediatype: state.mediaType, fileMimetype: state.mimeType, fileSize: state.size });
        case 'error':
            return basePayload;
    }
}
//# sourceMappingURL=index.js.map