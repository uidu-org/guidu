import * as uuid from 'uuid/v4';
import { Store, Dispatch, Middleware } from 'redux';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
  TouchFileDescriptor,
  FileState,
  fileStreamsCache,
  getMediaTypeFromMimeType,
  FilePreview,
  isPreviewableType,
  MediaType,
} from '@uidu/media-core';
import { State, SelectedItem, LocalUpload, ServiceName } from '../domain';
import { isStartImportAction } from '../actions/startImport';
import { finalizeUpload } from '../actions/finalizeUpload';
import { remoteUploadStart } from '../actions/remoteUploadStart';
import { getPreview } from '../actions/getPreview';
import { handleCloudFetchingEvent } from '../actions/handleCloudFetchingEvent';
import { setEventProxy } from '../actions/setEventProxy';
import { hidePopup } from '../actions/hidePopup';
import { RECENTS_COLLECTION } from '../config';
import { WsProvider } from '../tools/websocket/wsProvider';
import { WsConnectionHolder } from '../tools/websocket/wsConnectionHolder';
import { RemoteUploadActivity } from '../tools/websocket/upload/remoteUploadActivity';
import { MediaFile, copyMediaFileForUpload } from '../../domain/file';
import { PopupUploadEventEmitter } from '../../components/types';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { setUpfrontIdDeferred } from '../actions/setUpfrontIdDeferred';
import { WsNotifyMetadata } from '../tools/websocket/wsMessageData';
import { getPreviewFromMetadata } from '../../domain/preview';
export interface RemoteFileItem extends SelectedItem {
  accountId: string;
  publicId: string;
}

export const isRemoteFileItem = (
  item: SelectedItem,
): item is RemoteFileItem => {
  return ['dropbox', 'google', 'giphy'].indexOf(item.serviceName) !== -1;
};

export const isRemoteService = (serviceName: ServiceName) => {
  return ['dropbox', 'google', 'giphy'].indexOf(serviceName) !== -1;
};

export type SelectedUploadFile = {
  readonly file: MediaFile;
  readonly serviceName: ServiceName;
  readonly touchFileDescriptor: TouchFileDescriptor;
  readonly accountId?: string;
};

const mapSelectedItemToSelectedUploadFile = (
  {
    id,
    name,
    mimeType,
    size,
    date,
    serviceName,
    accountId,
    upfrontId,
    occurrenceKey = uuid(),
  }: SelectedItem,
  collection?: string,
): SelectedUploadFile => ({
  file: {
    id,
    name,
    size,
    creationDate: date || Date.now(),
    type: mimeType,
    upfrontId,
    occurrenceKey,
  },
  serviceName,
  accountId,
  touchFileDescriptor: {
    fileId: uuid(),
    occurrenceKey,
    collection,
  },
});

export function importFilesMiddleware(
  eventEmitter: PopupUploadEventEmitter,
  wsProvider: WsProvider,
): Middleware {
  return store => (next: Dispatch<State>) => action => {
    if (isStartImportAction(action)) {
      importFiles(eventEmitter, store as any, wsProvider);
    }
    return next(action);
  };
}

const getPreviewByService = (
  store: Store<State>,
  serviceName: ServiceName,
  mediaType: MediaType,
  fileId: string,
) => {
  const { userContext, giphy } = store.getState();

  if (serviceName === 'giphy') {
    const selectedGiphy = giphy.imageCardModels.find(
      cardModel => cardModel.metadata.id === fileId,
    );
    if (selectedGiphy) {
      return {
        value: selectedGiphy.dataURI,
      };
    }
  } else if (serviceName === 'upload') {
    const observable = fileStreamsCache.get(fileId);
    if (observable) {
      return new Promise<FilePreview>(resolve => {
        const subscription = observable.subscribe({
          next(state) {
            if (state.status !== 'error') {
              setTimeout(() => subscription.unsubscribe(), 0);
              resolve(state.preview);
            }
          },
        });
      });
    }
  } else if (serviceName === 'recent_files' && isPreviewableType(mediaType)) {
    return new Promise<FilePreview>(async resolve => {
      // We fetch a good size image, since it can be opened later on in MV
      const blob = await userContext.getImage(fileId, {
        collection: RECENTS_COLLECTION,
        width: 1920,
        height: 1080,
        mode: 'fit',
      });

      resolve({ value: blob });
    });
  }

  return undefined;
};

export const touchSelectedFiles = (
  selectedUploadFiles: SelectedUploadFile[],
  store: Store<State>,
) => {
  if (selectedUploadFiles.length === 0) {
    return;
  }

  const { tenantContext, config } = store.getState();
  const tenantCollection =
    config.uploadParams && config.uploadParams.collection;

  selectedUploadFiles.forEach(
    ({ file: selectedFile, serviceName, touchFileDescriptor }) => {
      const id = touchFileDescriptor.fileId;

      const mediaType = getMediaTypeFromMimeType(selectedFile.type);
      const preview = getPreviewByService(
        store,
        serviceName,
        mediaType,
        selectedFile.id,
      );

      const state: FileState = {
        id,
        status: 'processing',
        mediaType,
        mimeType: selectedFile.type,
        name: selectedFile.name,
        size: selectedFile.size,
        preview,
      };
      const subject = new ReplaySubject<FileState>(1);
      subject.next(state);
      fileStreamsCache.set(id, subject);
    },
  );

  const touchFileDescriptors = selectedUploadFiles.map(
    selectedUploadFile => selectedUploadFile.touchFileDescriptor,
  );
  tenantContext.file.touchFiles(touchFileDescriptors, tenantCollection);
};

export async function importFiles(
  eventEmitter: PopupUploadEventEmitter,
  store: Store<State>,
  wsProvider: WsProvider,
): Promise<void> {
  const { uploads, selectedItems, userContext, config } = store.getState();
  const tenantCollection =
    config.uploadParams && config.uploadParams.collection;
  store.dispatch(hidePopup());

  const auth = await userContext.config.authProvider();
  const selectedUploadFiles = selectedItems.map(item =>
    mapSelectedItemToSelectedUploadFile(item, tenantCollection),
  );

  touchSelectedFiles(selectedUploadFiles, store);

  eventEmitter.emitUploadsStart(
    selectedUploadFiles.map(({ file, touchFileDescriptor }) =>
      copyMediaFileForUpload(file, touchFileDescriptor.fileId),
    ),
  );

  selectedUploadFiles.forEach(selectedUploadFile => {
    const { file, serviceName, touchFileDescriptor } = selectedUploadFile;
    const selectedItemId = file.id;
    if (serviceName === 'upload') {
      const localUpload: LocalUpload = uploads[selectedItemId];
      const { fileId } = touchFileDescriptor;
      importFilesFromLocalUpload(
        selectedItemId,
        fileId,
        store,
        localUpload,
        fileId,
      );
    } else if (serviceName === 'recent_files') {
      importFilesFromRecentFiles(selectedUploadFile, store);
    } else if (isRemoteService(serviceName)) {
      const wsConnectionHolder = wsProvider.getWsConnectionHolder(auth);

      importFilesFromRemoteService(
        selectedUploadFile,
        store,
        wsConnectionHolder,
      );
    }
  });
}

export const importFilesFromLocalUpload = (
  selectedItemId: string,
  uploadId: string,
  store: Store<State>,
  localUpload: LocalUpload,
  replaceFileId?: string,
): void => {
  localUpload.events.forEach(originalEvent => {
    const event = { ...originalEvent };

    if (event.name === 'upload-processing') {
      const { file } = event.data;
      const source = {
        id: file.id,
        collection: RECENTS_COLLECTION,
      };

      store.dispatch(finalizeUpload(file, uploadId, source, replaceFileId));
    } else if (event.name !== 'upload-end') {
      store.dispatch(sendUploadEvent({ event, uploadId }));
    }
  });

  store.dispatch(setEventProxy(selectedItemId, uploadId));
};

export const importFilesFromRecentFiles = (
  selectedUploadFile: SelectedUploadFile,
  store: Store<State>,
): void => {
  const { file, touchFileDescriptor } = selectedUploadFile;
  const { fileId } = touchFileDescriptor;
  const source = {
    id: file.id,
    collection: RECENTS_COLLECTION,
  };

  store.dispatch(finalizeUpload(file, fileId, source, fileId));
  store.dispatch(getPreview(fileId, file, RECENTS_COLLECTION));
};

export const importFilesFromRemoteService = (
  selectedUploadFile: SelectedUploadFile,
  store: Store<State>,
  wsConnectionHolder: WsConnectionHolder,
): void => {
  const {
    touchFileDescriptor,
    serviceName,
    accountId,
    file,
  } = selectedUploadFile;
  const { fileId } = touchFileDescriptor;
  const { deferredIdUpfronts } = store.getState();
  const deferred = deferredIdUpfronts[file.id];

  if (deferred) {
    const { rejecter, resolver } = deferred;
    // We asociate the temporary file.id with the uploadId
    store.dispatch(setUpfrontIdDeferred(fileId, resolver, rejecter));
  }
  const uploadActivity = new RemoteUploadActivity(fileId, (event, payload) => {
    if (event === 'NotifyMetadata') {
      const preview = getPreviewFromMetadata(
        (payload as WsNotifyMetadata).metadata,
      );

      store.dispatch(
        sendUploadEvent({
          event: {
            name: 'upload-preview-update',
            data: {
              file,
              preview,
            },
          },
          uploadId: fileId,
        }),
      );
    } else {
      // TODO figure out the difference between this uploadId and the last MSW-405
      const { uploadId: newUploadId } = payload;
      const newFile: MediaFile = {
        ...file,
        id: newUploadId,
        creationDate: Date.now(),
      };

      store.dispatch(handleCloudFetchingEvent(newFile, event, payload));
    }
  });

  uploadActivity.on('Started', () => {
    store.dispatch(remoteUploadStart(fileId));
  });

  wsConnectionHolder.openConnection(uploadActivity);

  wsConnectionHolder.send({
    type: 'fetchFile',
    params: {
      serviceName,
      accountId,
      fileId: file.id,
      fileName: file.name,
      collection: RECENTS_COLLECTION,
      jobId: fileId,
    },
  });
};
