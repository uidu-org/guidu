import { handleCloudFetchingEvent } from '../../handleCloudFetchingEvent';
import { mockStore } from '@uidu/media-test-helpers';
import {
  HANDLE_CLOUD_FETCHING_EVENT,
  HandleCloudFetchingEventAction,
} from '../../../actions/handleCloudFetchingEvent';
import { FINALIZE_UPLOAD } from '../../../actions/finalizeUpload';
import { RECENTS_COLLECTION } from '../../../config';
import { sendUploadEvent } from '../../../actions/sendUploadEvent';

describe('handleCloudFetchingEvent', () => {
  const uploadId = 'some-upload-id';
  const fileId = 'file-id';
  const bytes = 50;
  const fileSize = 1000;
  const client = { id: 'some-client-id', token: 'some-client-token' };
  const description = 'some-error-description';
  const deferredIdUpfronts = {};
  const upfrontId = Promise.resolve('1');
  const file = {
    id: 'some-id',
    name: 'some-name',
    size: 12345,
    creationDate: Date.now(),
    type: 'image/jpg',
    upfrontId,
  };

  const setup = () => {
    return {
      store: mockStore(),
      next: jest.fn(),
    };
  };

  it('should report upload-status-update to the parent channel when receives RemoteUploadProgress event', () => {
    const { store, next } = setup();
    const action: HandleCloudFetchingEventAction<'RemoteUploadProgress'> = {
      type: HANDLE_CLOUD_FETCHING_EVENT,
      file,
      event: 'RemoteUploadProgress',
      payload: { uploadId, bytes, fileSize },
    };
    const portion = 0.05;

    handleCloudFetchingEvent(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(
      sendUploadEvent({
        event: {
          name: 'upload-status-update',
          data: {
            file,
            progress: {
              absolute: file.size * portion,
              expectedFinishTime: expect.any(Number),
              max: file.size,
              overallTime: expect.any(Number),
              portion,
              timeLeft: expect.any(Number),
            },
          },
        },
        uploadId,
      }),
    );
  });

  it('should dispatch finalizeUpload and getPreview when receives RemoteUploadEnd event', () => {
    const { store, next } = setup();
    const action: HandleCloudFetchingEventAction<'RemoteUploadEnd'> = {
      type: HANDLE_CLOUD_FETCHING_EVENT,
      file,
      event: 'RemoteUploadEnd',
      payload: { fileId, uploadId },
    };
    const remoteUploads = {
      'some-upload-id': {},
    };

    (store.getState as jest.Mock<any>).mockReturnValue({
      client,
      remoteUploads,
      deferredIdUpfronts,
    });

    handleCloudFetchingEvent(store)(next)(action);

    const uploadedFile = {
      ...file,
      id: fileId,
    };

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0]).toEqual({
      type: FINALIZE_UPLOAD,
      uploadId,
      file: uploadedFile,
      replaceFileId: file.id,
      source: {
        id: fileId,
        collection: RECENTS_COLLECTION,
      },
    });
  });

  it('should report upload-error to the parent channel when receives RemoteUploadFail event', () => {
    const { store, next } = setup();
    const action = {
      type: HANDLE_CLOUD_FETCHING_EVENT,
      file,
      event: 'RemoteUploadFail',
      payload: { uploadId, description },
    };

    handleCloudFetchingEvent(store)(next)(action);

    expect(store.dispatch).toHaveBeenCalledWith(
      sendUploadEvent({
        event: {
          name: 'upload-error',
          data: {
            file,
            error: {
              fileId: uploadId,
              name: 'remote_upload_fail',
              description,
            },
          },
        },
        uploadId,
      }),
    );
  });

  it('should call next(action) if the action type matches', () => {
    const { store, next } = setup();
    const action = {
      type: HANDLE_CLOUD_FETCHING_EVENT,
      event: 'unknown',
    };

    handleCloudFetchingEvent(store)(next)(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should call next(action) if the action type does not match', () => {
    const { store, next } = setup();
    const action = {
      type: 'some-other-type',
    };

    handleCloudFetchingEvent(store)(next)(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});
