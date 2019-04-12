import * as tslib_1 from "tslib";
import { downloadButtonEvent } from '../../../../newgen/analytics/download';
import { processedFile, processingFile, uploadingFile, processingError, fileWithError, } from './index.spec';
import { version as packageVersion } from '../../../../../package.json';
var unsupportedFile = tslib_1.__assign({}, processedFile, { mediaType: 'unknown' });
var basePayload = {
    eventType: 'ui',
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'downloadButton',
};
var contextPayload = {
    componentName: 'media-viewer',
    packageName: '@atlaskit/media-viewer',
    packageVersion: packageVersion,
};
var commonFileProperties = {
    fileId: 'some-id',
    fileMimetype: 'jpg',
    fileSize: 100,
};
describe('downloadButtonEvent payload', function () {
    describe('by file status', function () {
        it('for processed files', function () {
            expect(downloadButtonEvent(processedFile)).toEqual(tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, contextPayload, commonFileProperties, { fileMediatype: 'image', fileProcessingStatus: 'processed', fileSupported: true }) }));
        });
        it('for processing files', function () {
            expect(downloadButtonEvent(processingFile)).toEqual(tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, contextPayload, commonFileProperties, { fileMediatype: 'image', fileProcessingStatus: 'processing', fileSupported: true }) }));
        });
        it('for uploading files', function () {
            expect(downloadButtonEvent(uploadingFile)).toEqual(tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, contextPayload, commonFileProperties, { fileMediatype: 'image', fileProcessingStatus: 'uploading', fileSupported: true }) }));
        });
        it('for files that failed to be processed', function () {
            expect(downloadButtonEvent(processingError)).toEqual(tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, contextPayload, commonFileProperties, { fileId: 'some-id', fileMediatype: 'image', fileProcessingStatus: 'failed-processing', fileSupported: true }) }));
        });
        it('when error', function () {
            expect(downloadButtonEvent(fileWithError)).toEqual(tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, contextPayload, { fileId: 'some-id', fileProcessingStatus: 'error' }) }));
        });
    });
    it('should include fileSupported', function () {
        expect(downloadButtonEvent(unsupportedFile)).toEqual(tslib_1.__assign({}, basePayload, { attributes: tslib_1.__assign({}, contextPayload, commonFileProperties, { fileMediatype: 'unknown', fileProcessingStatus: 'processed', fileSupported: false }) }));
    });
});
//# sourceMappingURL=download.spec.js.map