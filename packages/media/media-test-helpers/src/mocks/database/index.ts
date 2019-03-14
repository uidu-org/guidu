import { ClientBasedAuth } from '@uidu/media-core';
import { MediaStore, MediaCollection } from '@uidu/media-store';
import { Database } from 'kakapo';
import * as uuid from 'uuid';

import { getFakeFileName, fakeImage } from './mockData';
import { mapDataUriToBlob } from '../../utils';
import { createCollection } from './collection';
import { CollectionItem, createCollectionItem } from './collection-item';
import { createUpload, Upload } from './upload';
import { Chunk } from './chunk';
import { defaultBaseUrl } from '../../contextProvider';
import { MockUserCollection } from '../media-mock';

export * from './collection';
export * from './collection-item';

export const tenantAuth: ClientBasedAuth = {
  clientId: uuid.v4(),
  token: 'some-tenant-token',
  baseUrl: defaultBaseUrl,
};

export const userAuth: ClientBasedAuth = {
  clientId: uuid.v4(),
  token: 'some-user-token',
  baseUrl: defaultBaseUrl,
};

export const userAuthProvider = () => Promise.resolve(userAuth);
export const tenantAuthProvider = () => Promise.resolve(tenantAuth);

export type DatabaseSchema = {
  collection: MediaCollection;
  collectionItem: CollectionItem;
  upload: Upload;
  chunk: Chunk;
};

export function createDatabase(): Database<DatabaseSchema> {
  const database = new Database<DatabaseSchema>();

  database.register('collectionItem', createCollectionItem);
  database.register('collection', createCollection);
  database.register('upload', createUpload);
  database.register('chunk');

  return database;
}

export function generateUserData(
  collectionData: MockUserCollection | undefined,
): void {
  const mediaStore = new MediaStore({
    authProvider: userAuthProvider,
  });

  const collection = 'recents';
  mediaStore.createCollection(collection);

  if (collectionData) {
    Object.keys(collectionData).forEach(filename => {
      const dataUri = collectionData[filename];
      const image = mapDataUriToBlob(dataUri);

      mediaStore.createFileFromBinary(image, {
        name: filename,
        collection,
        occurrenceKey: uuid.v4(),
      });
    });
  } else {
    // just insert 10 random files with the same image
    const image = mapDataUriToBlob(fakeImage);

    for (let i = 0; i < 10; i++) {
      mediaStore.createFileFromBinary(image, {
        name: getFakeFileName(),
        collection,
        occurrenceKey: uuid.v4(),
      });
    }
  }
}

export function generateTenantData(): void {
  const mediaStore = new MediaStore({
    authProvider: tenantAuthProvider,
  });

  mediaStore.createCollection('MediaServicesSample');
}
