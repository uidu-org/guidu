import {
  mockPopupUploadEventEmitter,
  mockStore,
} from '@uidu/media-test-helpers';
import sendUploadEventMiddleware from '../../sendUploadEvent';
import { sendUploadEvent } from '../../../actions/sendUploadEvent';
import { MediaError } from '../../../../domain/error';
import { SCALE_FACTOR_DEFAULT } from '../../../../util/getPreviewFromImage';
import { MediaFile } from '../../../../domain/file';
// avoid polluting test logs with error message in console
// please ensure you fix it if you expect console.error to be thrown
// tslint:disable-next-line:no-console
let consoleError = console.error;

describe('sendUploadEvent middleware', () => {
  const uploadId = 'some-upload-id';
  const upfrontId = Promise.resolve('1');
  const userUpfrontId = Promise.resolve('');
  const file: MediaFile = {
    id: 'some-file-id',
    name: 'some-file-name',
    size: 12345,
    creationDate: Date.now(),
    type: 'image/jpg',
    upfrontId,
    userUpfrontId,
  };
  const setup = () => ({
    eventEmitter: mockPopupUploadEventEmitter(),
    store: mockStore(),
    next: jest.fn(),
  });

  it('should do nothing given unknown action', () => {
    const { eventEmitter, store, next } = setup();
    const action = {
      type: 'UNKNOWN',
    };

    sendUploadEventMiddleware(eventEmitter)(store)(next)(action);

    expect(eventEmitter.emitClosed).not.toBeCalled();
    expect(eventEmitter.emitReady).not.toBeCalled();
    expect(eventEmitter.emitUploadsStart).not.toBeCalled();
    expect(eventEmitter.emitUploadProgress).not.toBeCalled();
    expect(eventEmitter.emitUploadPreviewUpdate).not.toBeCalled();
    expect(eventEmitter.emitUploadProcessing).not.toBeCalled();
    expect(eventEmitter.emitUploadEnd).not.toBeCalled();
    expect(eventEmitter.emitUploadError).not.toBeCalled();

    expect(next).toBeCalledWith(action);
  });

  it('should emit upload status update event', () => {
    const { eventEmitter, store, next } = setup();
    const progress = {
      absolute: 123,
      portion: 0.21,
      max: 256,
      overallTime: 12323,
      expectedFinishTime: 23423,
      timeLeft: 12432,
    };

    sendUploadEventMiddleware(eventEmitter)(store)(next)(
      sendUploadEvent({
        event: {
          name: 'upload-status-update',
          data: {
            file,
            progress,
          },
        },
        uploadId,
      }),
    );

    expect(eventEmitter.emitUploadProgress).toBeCalledWith(
      {
        ...file,
        id: uploadId,
      },
      progress,
    );
  });

  it('should emit upload preview update event', () => {
    const { eventEmitter, store, next } = setup();
    const preview = {
      dimensions: {
        width: 1980,
        height: 1080,
      },
      scaleFactor: SCALE_FACTOR_DEFAULT,
    };

    sendUploadEventMiddleware(eventEmitter)(store)(next)(
      sendUploadEvent({
        event: {
          name: 'upload-preview-update',
          data: {
            file,
            preview,
          },
        },
        uploadId,
      }),
    );

    expect(eventEmitter.emitUploadPreviewUpdate).toBeCalledWith(
      {
        ...file,
        id: uploadId,
      },
      preview,
    );
  });

  it('should emit upload processing event', () => {
    const { eventEmitter, store, next } = setup();

    sendUploadEventMiddleware(eventEmitter)(store)(next)(
      sendUploadEvent({
        event: {
          name: 'upload-processing',
          data: {
            file,
          },
        },
        uploadId,
      }),
    );

    expect(eventEmitter.emitUploadProcessing).toBeCalledWith({
      ...file,
      id: uploadId,
    });
  });

  it('should emit upload end event', () => {
    const { eventEmitter, store, next } = setup();
    const mediaApiData = {
      id: file.id,
    };

    sendUploadEventMiddleware(eventEmitter)(store)(next)(
      sendUploadEvent({
        event: {
          name: 'upload-end',
          data: {
            file,
            public: mediaApiData,
          },
        },
        uploadId,
      }),
    );

    expect(eventEmitter.emitUploadEnd).toBeCalledWith(
      {
        ...file,
        id: uploadId,
      },
      mediaApiData,
    );
  });

  it('should emit upload error event', () => {
    const { eventEmitter, store, next } = setup();
    // tslint:disable-next-line:no-console
    console.error = jest.fn();
    const error: MediaError = {
      name: 'upload_fail',
      description: 'some-description',
    };

    sendUploadEventMiddleware(eventEmitter)(store)(next)(
      sendUploadEvent({
        event: {
          name: 'upload-error',
          data: {
            file,
            error,
          },
        },
        uploadId,
      }),
    );

    expect(eventEmitter.emitUploadError).toBeCalledWith(
      {
        ...file,
        id: uploadId,
      },
      error,
    );
    // tslint:disable-next-line:no-console
    console.error = consoleError;
  });
});
