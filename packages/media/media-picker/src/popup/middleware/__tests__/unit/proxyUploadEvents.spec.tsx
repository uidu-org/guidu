import { UploadProcessingEvent } from '../../../../domain/uploadEvent';
import { mockStore } from '@uidu/media-test-helpers';
import { proxyUploadEvents } from '../../proxyUploadEvents';
import { FINALIZE_UPLOAD } from '../../../actions/finalizeUpload';
import { RECENTS_COLLECTION } from '../../../config';

describe('proxyUploadEvents middleware', () => {
  const client: any = { id: 'some-client-id' };
  const firstUploadId = 'first-upload-id';
  const secondUploadId = 'second-upload-id';
  const uploads: any = {
    'first-id': {},
    'second-id': { proxy: 'wrong-proxy ' },
    'third-id': { proxy: [firstUploadId, secondUploadId] },
  };
  const state = { uploads, client };
  const upfrontId = Promise.resolve('1');
  const file = {
    id: 'third-id',
    name: 'some-name',
    size: 12345,
    creationDate: Date.now(),
    type: 'image/jpg',
    upfrontId,
  };

  const setup = () => {
    const store = mockStore(state);
    const next = jest.fn();

    return { store, next };
  };

  it('should do nothing and call next with action for the action of the other type', () => {
    const { store, next } = setup();
    const action: any = {
      type: 'SOME_OTHER_TYPE',
    };

    proxyUploadEvents(store)(next)(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch FINALIZE_UPLOAD for upload-processing event', () => {
    const { store, next } = setup();
    const originalEvent: UploadProcessingEvent = {
      name: 'upload-processing',
      data: {
        file,
      },
    };
    const action = {
      type: 'FILE_UPLOAD_PROCESSING_START',
      file,
      originalEvent,
    };
    const source = { id: file.id, collection: RECENTS_COLLECTION };

    proxyUploadEvents(store)(next)(action);

    expect(store.dispatch).toHaveBeenCalledTimes(2);

    const calls = store.dispatch.mock.calls;
    expect(calls[0][0]).toEqual({
      type: FINALIZE_UPLOAD,
      uploadId: firstUploadId,
      file: originalEvent.data.file,
      source,
      replaceFileId: firstUploadId,
    });
    expect(calls[1][0]).toEqual({
      type: FINALIZE_UPLOAD,
      uploadId: secondUploadId,
      file: originalEvent.data.file,
      source,
      replaceFileId: secondUploadId,
    });
  });
});
