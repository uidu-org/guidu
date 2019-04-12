import { fileStateToFileGasPayload } from '../../../../newgen/analytics/index';
export var processedFile = {
    status: 'processed',
    id: 'some-id',
    name: 'some name',
    size: 100,
    mediaType: 'image',
    mimeType: 'jpg',
    artifacts: {},
};
export var processingFile = {
    status: 'processing',
    id: 'some-id',
    name: 'some name',
    size: 100,
    mediaType: 'image',
    mimeType: 'jpg',
};
export var uploadingFile = {
    status: 'uploading',
    id: 'some-id',
    name: 'some name',
    size: 100,
    progress: 50,
    mediaType: 'image',
    mimeType: 'jpg',
};
export var fileWithError = {
    status: 'error',
    id: 'some-id',
    message: 'some error',
};
export var processingError = {
    status: 'failed-processing',
    id: 'some-id',
    name: 'some name',
    size: 100,
    mediaType: 'image',
    mimeType: 'jpg',
    artifacts: {},
};
var commonFileProperties = {
    fileId: 'some-id',
    fileMediatype: 'image',
    fileMimetype: 'jpg',
    fileSize: 100,
};
describe('fileStateToFileGasPayload', function () {
    it('should extract right payload from processed files', function () {
        expect(fileStateToFileGasPayload(processedFile)).toEqual(commonFileProperties);
    });
    it('should extract right payload from processing files', function () {
        expect(fileStateToFileGasPayload(processingFile)).toEqual(commonFileProperties);
    });
    it('should extract right payload from uploading files', function () {
        expect(fileStateToFileGasPayload(uploadingFile)).toEqual(commonFileProperties);
    });
    it('should extract right payload from files that failed to be processed', function () {
        expect(fileStateToFileGasPayload(processingError)).toEqual(commonFileProperties);
    });
    it('should extract the minimum payload when error', function () {
        expect(fileStateToFileGasPayload(fileWithError)).toEqual({
            fileId: 'some-id',
        });
    });
});
//# sourceMappingURL=index.spec.js.map