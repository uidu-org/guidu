import { Action } from 'redux';

import { isRemoveEventProxyAction } from '../actions/removeEventProxy';
import { State } from '../domain';

export default function removeEventProxy(state: State, action: Action): State {
  if (isRemoveEventProxyAction(action)) {
    const { uploadId, proxyId } = action.payload;
    const uploads = { ...state.uploads };
    const upload = uploads[uploadId];

    if (upload) {
      const { proxy } = upload;
      if (proxy) {
        const pos = proxy.indexOf(proxyId);

        if (pos > -1) {
          if (proxy.length === 1) {
            delete uploads[uploadId];
          } else {
            proxy.splice(pos, 1);
          }
        }
      }
    }

    return { ...state, ...{ uploads } };
  } else {
    return state;
  }
}
