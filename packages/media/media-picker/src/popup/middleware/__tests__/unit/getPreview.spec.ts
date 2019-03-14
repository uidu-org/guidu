import { mockStore } from '@uidu/media-test-helpers';
import getPreviewMiddleware, { getPreview } from '../../getPreview';
import { sendUploadEvent } from '../../../actions/sendUploadEvent';
import { GetPreviewAction } from '../../../actions/getPreview';
import { Observable } from 'rxjs';
import { Preview } from '../../../../domain/preview';

describe('getPreviewMiddleware', () => {
  const auth = {
    clientId: 'some-client-id',
    token: 'some-token',
  };
  const upfrontId = Promise.resolve('1');
  const file = {
    id: 'some-file-id',
    name: 'some-file-name',
    type: 'some-file-type',
    creationDate: Date.now(),
    size: 12345,
    upfrontId,
  };
  const collection = 'some-collection';
  const uploadId = 'some-upload-id';
  const preview: Preview = {
    dimensions: {
      width: 10,
      height: 10,
    },
    scaleFactor: 1,
  };
  const setup = () => {
    const store = mockStore();
    const { userContext } = store.getState();
    (userContext.config.authProvider as jest.Mock<any>).mockReturnValue(
      Promise.resolve(auth),
    );
    (userContext.file.getFileState as any) = jest.fn().mockReturnValue(
      Observable.of({
        status: 'processing',
        mediaType: 'image',
      }),
    );
    (userContext.getImageMetadata as any) = jest.fn().mockReturnValue({
      original: {
        url: 'some-preview-src',
        width: 10,
        height: 10,
      },
    });

    return {
      store,
      next: jest.fn(),
      action: {
        type: 'GET_PREVIEW',
        file,
        collection,
        uploadId,
      } as GetPreviewAction,
    };
  };

  it('should do nothing given unknown action', () => {
    const { store, next } = setup();
    const action = {
      type: 'UNKNOWN',
    };

    getPreviewMiddleware()(store)(next)(action);

    expect(store.dispatch).not.toBeCalled();
    expect(next).toBeCalledWith(action);
  });

  it('should dispatch send upload event action with upload-preview-update event', () => {
    const { store, action } = setup();
    return getPreview(store, action).then(() => {
      expect(store.dispatch).toBeCalledWith(
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
    });
  });
});
