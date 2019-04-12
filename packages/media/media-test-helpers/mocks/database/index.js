import { MediaStore } from '@uidu/media-store';
import { Database } from 'kakapo';
import * as uuid from 'uuid';
import { getFakeFileName, fakeImage } from './mockData';
import { mapDataUriToBlob } from '../../utils';
import { createCollection } from './collection';
import { createCollectionItem } from './collection-item';
import { createUpload } from './upload';
import { defaultBaseUrl } from '../../contextProvider';
export * from './collection';
export * from './collection-item';
export var tenantAuth = {
    clientId: uuid.v4(),
    token: 'some-tenant-token',
    baseUrl: defaultBaseUrl,
};
export var userAuth = {
    clientId: uuid.v4(),
    token: 'some-user-token',
    baseUrl: defaultBaseUrl,
};
export var userAuthProvider = function () { return Promise.resolve(userAuth); };
export var tenantAuthProvider = function () { return Promise.resolve(tenantAuth); };
export function createDatabase() {
    var database = new Database();
    database.register('collectionItem', createCollectionItem);
    database.register('collection', createCollection);
    database.register('upload', createUpload);
    database.register('chunk');
    return database;
}
export function generateUserData(collectionData) {
    var mediaStore = new MediaStore({
        authProvider: userAuthProvider,
    });
    var collection = 'recents';
    mediaStore.createCollection(collection);
    if (collectionData) {
        Object.keys(collectionData).forEach(function (filename) {
            var dataUri = collectionData[filename];
            var image = mapDataUriToBlob(dataUri);
            mediaStore.createFileFromBinary(image, {
                name: filename,
                collection: collection,
                occurrenceKey: uuid.v4(),
            });
        });
    }
    else {
        // just insert 10 random files with the same image
        var image = mapDataUriToBlob(fakeImage);
        for (var i = 0; i < 10; i++) {
            mediaStore.createFileFromBinary(image, {
                name: getFakeFileName(),
                collection: collection,
                occurrenceKey: uuid.v4(),
            });
        }
    }
}
export function generateTenantData() {
    var mediaStore = new MediaStore({
        authProvider: tenantAuthProvider,
    });
    mediaStore.createCollection('MediaServicesSample');
}
//# sourceMappingURL=index.js.map