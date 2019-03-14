import { MiddlewareAPI, Dispatch, Action } from 'redux';

import { isCancelUploadAction } from '../actions/cancelUpload';
import { removeEventProxy } from '../actions/removeEventProxy';
import { State } from '../domain';

export default (store: MiddlewareAPI<State>) => (next: Dispatch<State>) => (
  action: Action,
) => {
  if (isCancelUploadAction(action)) {
    const { tenantUploadId } = action.payload;
    const { uploads, onCancelUpload } = store.getState();
    const shouldRemoveEventProxy = (proxy: string[]) =>
      proxy.some(proxyId => proxyId === tenantUploadId);

    Object.keys(uploads)
      .map(uploadId => {
        const upload = uploads[uploadId];
        const proxy = (upload && upload.proxy) || [];
        return {
          uploadId,
          proxy,
        };
      })
      .filter(({ proxy }) => shouldRemoveEventProxy(proxy))
      .forEach(({ uploadId, proxy }) => {
        store.dispatch(
          removeEventProxy({
            uploadId,
            proxyId: tenantUploadId,
          }),
        );

        if (proxy.length === 1) {
          onCancelUpload(uploadId);
        }
      });
  }

  return next(action);
};
