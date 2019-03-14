import { LocalUploads } from '../../../domain';
import cancelUploadMiddleware from '../../cancelUpload';
import { cancelUpload } from '../../../actions/cancelUpload';
import { removeEventProxy } from '../../../actions/removeEventProxy';
import { mockStore } from '@uidu/media-test-helpers';

describe('cancelUpload', () => {
  const uploadId = 'some-upload-id';
  const tenantUploadId = 'some-tenant-upload-id';

  const setup = (uploads: LocalUploads = {}, onCancelUpload: () => {}) => ({
    store: mockStore({ uploads, onCancelUpload }),
    next: jest.fn(),
    onCancelUpload: jest.fn(),
  });

  it('should cancel upload and remove proxy event given upload with one proxy', () => {
    const onCancelUpload = jest.fn();
    const { store, next } = setup(
      {
        [uploadId]: {
          proxy: [tenantUploadId],
        } as any,
      },
      onCancelUpload,
    );

    cancelUploadMiddleware(store)(next)(
      cancelUpload({
        tenantUploadId,
      }),
    );

    expect(onCancelUpload).toBeCalledWith(uploadId);
    expect(store.dispatch).toBeCalledWith(
      removeEventProxy({
        uploadId,
        proxyId: tenantUploadId,
      }),
    );
  });

  it('should not cancel upload and remove proxy event given upload with more than one proxy', () => {
    const onCancelUpload = jest.fn();
    const { store, next } = setup(
      {
        [uploadId]: {
          proxy: ['some-other-tenant-upload-id', tenantUploadId],
        } as any,
      },
      onCancelUpload,
    );

    cancelUploadMiddleware(store)(next)(
      cancelUpload({
        tenantUploadId,
      }),
    );

    expect(onCancelUpload).not.toBeCalled();
    expect(store.dispatch).toBeCalledWith(
      removeEventProxy({
        uploadId,
        proxyId: tenantUploadId,
      }),
    );
  });

  it('should not cancel upload and not remove proxy event given upload with no proxy', () => {
    const onCancelUpload = jest.fn();
    const { store, next } = setup(
      {
        [uploadId]: {} as any,
      },
      onCancelUpload,
    );

    cancelUploadMiddleware(store)(next)(
      cancelUpload({
        tenantUploadId,
      }),
    );

    expect(onCancelUpload).not.toBeCalled();
    expect(store.dispatch).not.toBeCalled();
  });
});
