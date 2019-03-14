import { SmartMediaProgress } from '../../domain/progress';
import { Action, Dispatch, Store } from 'redux';
import { finalizeUpload } from '../actions/finalizeUpload';
import {
  HANDLE_CLOUD_FETCHING_EVENT,
  HandleCloudFetchingEventAction,
} from '../actions/handleCloudFetchingEvent';

import { State } from '../domain';
import { RECENTS_COLLECTION } from '../config';

import {
  WsUploadEvents,
  RemoteUploadProgressPayload,
  RemoteUploadEndPayload,
  RemoteUploadFailPayload,
} from '../tools/websocket/upload/wsUploadEvents';
import { MediaFile } from '../../domain/file';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { setUpfrontIdDeferred } from '../actions/setUpfrontIdDeferred';

type CloudFetchingEventAction = HandleCloudFetchingEventAction<
  keyof WsUploadEvents
>;

const isCloudFetchingEventAction = (
  action: Action,
): action is CloudFetchingEventAction => {
  return action.type === HANDLE_CLOUD_FETCHING_EVENT;
};

const isRemoteUploadProgressAction = (
  action: CloudFetchingEventAction,
): action is HandleCloudFetchingEventAction<'RemoteUploadProgress'> => {
  return action.event === 'RemoteUploadProgress';
};

const isRemoteUploadEndAction = (
  action: CloudFetchingEventAction,
): action is HandleCloudFetchingEventAction<'RemoteUploadEnd'> => {
  return action.event === 'RemoteUploadEnd';
};

const isRemoteUploadFailAction = (
  action: CloudFetchingEventAction,
): action is HandleCloudFetchingEventAction<'RemoteUploadFail'> => {
  return action.event === 'RemoteUploadFail';
};

export const handleCloudFetchingEvent = (store: Store<State>) => (
  next: Dispatch<State>,
) => (action: Action) => {
  // Handle cloud upload progress
  const handleRemoteUploadProgressMessage = (
    file: MediaFile,
    data: RemoteUploadProgressPayload,
  ) => {
    const portion = data.bytes / data.fileSize;
    const progress = new SmartMediaProgress(
      file.size,
      file.size * portion,
      file.creationDate,
      Date.now(),
    );

    store.dispatch(
      sendUploadEvent({
        event: {
          name: 'upload-status-update',
          data: {
            file,
            progress: progress.toJSON(),
          },
        },
        uploadId: data.uploadId,
      }),
    );
  };

  // Handle cloud upload end
  const handleRemoteUploadEndMessage = (
    file: MediaFile,
    data: RemoteUploadEndPayload,
  ) => {
    const { deferredIdUpfronts } = store.getState();
    const { uploadId, fileId } = data;
    const deferred = deferredIdUpfronts[uploadId];
    const source = {
      id: fileId,
      collection: RECENTS_COLLECTION,
    };
    const uploadedFile = {
      ...file,
      id: fileId,
    };

    if (deferred) {
      const { rejecter, resolver } = deferred;
      // We asociate the uploadId with the public fileId on the user collection
      store.dispatch(setUpfrontIdDeferred(fileId, resolver, rejecter));
    }
    store.dispatch(finalizeUpload(uploadedFile, uploadId, source, file.id));
  };

  // Handle cloud upload fail
  const handleRemoteUploadFailMessage = (
    file: MediaFile,
    data: RemoteUploadFailPayload,
  ) => {
    store.dispatch(
      sendUploadEvent({
        event: {
          name: 'upload-error',
          data: {
            file,
            error: {
              fileId: data.uploadId,
              name: 'remote_upload_fail',
              description: data.description,
            },
          },
        },
        uploadId: data.uploadId,
      }),
    );
  };

  if (isCloudFetchingEventAction(action)) {
    if (isRemoteUploadProgressAction(action)) {
      handleRemoteUploadProgressMessage(action.file, action.payload);
    } else if (isRemoteUploadEndAction(action)) {
      handleRemoteUploadEndMessage(action.file, action.payload);
    } else if (isRemoteUploadFailAction(action)) {
      handleRemoteUploadFailMessage(action.file, action.payload);
    }
  }

  return next(action);
};
