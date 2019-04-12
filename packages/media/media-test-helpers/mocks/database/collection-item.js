import * as uuid from 'uuid';
import { getHackerNoun, getPastDate, fakeImage, getFakeFileName, getTextFileType, } from './mockData';
import { mapDataUriToBlob } from '../../utils';
export function createCollectionItem(_a) {
    var _b = _a === void 0 ? {} : _a, name = _b.name, mimeType = _b.mimeType, collectionName = _b.collectionName, occurrenceKey = _b.occurrenceKey, _c = _b.blob, blob = _c === void 0 ? new Blob(['Hello World'], { type: 'text/plain' }) : _c, id = _b.id;
    var extension = getTextFileType();
    return {
        id: id || uuid.v4(),
        insertedAt: getPastDate().valueOf(),
        occurrenceKey: occurrenceKey || uuid.v4(),
        details: {
            name: name || getFakeFileName(extension),
            size: blob.size,
            mimeType: mimeType,
            processingStatus: 'succeeded',
            mediaType: 'image',
            artifacts: {},
        },
        collectionName: collectionName || getHackerNoun(),
        blob: blob || mapDataUriToBlob(fakeImage),
    };
}
//# sourceMappingURL=collection-item.js.map