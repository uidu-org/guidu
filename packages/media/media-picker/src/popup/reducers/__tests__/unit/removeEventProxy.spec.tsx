import { removeEventProxy } from '../../../actions/removeEventProxy';
import removeEventProxyMiddleware from '../../removeEventProxy';

describe('removeEventProxy reducer', () => {
  const defaultState: any = {
    uploads: {
      upload1: {
        proxy: ['proxy1', 'proxy2'],
      },
      upload2: {
        proxy: [],
      },
    },
  };

  it('returns same state if action have wrong type', () => {
    const action = {
      type: 'REMOVE_EVENT_PROXY_WRONG',
    };

    const newState = removeEventProxyMiddleware(defaultState, action);
    expect(newState).toEqual(defaultState);
  });

  it('returns same state if uploadId is not found', () => {
    const action = removeEventProxy({
      uploadId: 'uploadUnknown',
      proxyId: 'proxy1',
    });

    const newState = removeEventProxyMiddleware({ ...defaultState }, action);
    expect(newState).toEqual(defaultState);
  });
});
