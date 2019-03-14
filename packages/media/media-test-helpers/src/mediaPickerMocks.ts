import { State } from '@atlaskit/media-picker/src/popup/domain';
import { Store } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import { fakeContext } from './fakeContextProvider';

export const mockState: State = {
  redirectUrl: 'some-redirect-url',
  view: {
    isVisible: true,
    items: [],
    isLoading: false,
    hasError: false,
    path: [],
    service: {
      accountId: 'some-view-service-account-id',
      name: 'google',
    },
    isUploading: false,
    isCancelling: false,
  },
  accounts: Promise.resolve([]),
  recents: {
    items: [],
  },
  selectedItems: [],
  lastUploadIndex: 0,
  uploads: {},
  remoteUploads: {},
  isCancelling: false,
  isUploading: false,
  giphy: {
    imageCardModels: [],
    totalResultCount: 100,
  },
  onCancelUpload: jest.fn(),
  tenantContext: fakeContext(),
  userContext: fakeContext(),
  config: {},
  deferredIdUpfronts: {},
};

export const mockStore = (state?: Partial<State>) => ({
  dispatch: jest.fn().mockImplementation(action => action),
  getState: jest.fn().mockReturnValue({
    ...mockState,
    ...state,
  }) as () => State,
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
});

export const mockChannel = () => {
  const channel = {
    listen: jest.fn(),
    send: jest.fn(),
    ready: jest.fn(),
    destroy: jest.fn(),
  };

  channel.ready.mockImplementation((callback: () => void) => callback());

  return channel;
};

export const mockProvider = jest.fn(() => ({
  observable: () => {
    return Observable.create();
  },
}));

export const mockAuthProvider = jest
  .fn()
  .mockReturnValue(
    Promise.resolve({ clientId: 'some-client-id', token: 'some-token' }),
  );

export const mockFetcher = () => ({
  fetchCloudAccountFolder: jest.fn(),
  pollFile: jest.fn(),
  getPreview: jest.fn(),
  getImage: jest.fn(),
  getServiceList: jest.fn(),
  getRecentFiles: jest.fn(),
  unlinkCloudAccount: jest.fn(),
  fetchCloudAccountFile: jest.fn(),
  copyFile: jest.fn(),
  fetchTrendingGifs: jest.fn(),
  fetchGifsRelevantToSearch: jest.fn(),
});

export const mockIsWebGLNotAvailable = () => {
  jest.mock('@atlaskit/media-picker/src/popup/tools/webgl', () => {
    return {
      isWebGLAvailable: jest.fn(() => {
        return false;
      }),
    };
  });
};

export const mockWsConnectionHolder = () => ({
  openConnection: jest.fn(),
  send: jest.fn(),
});

export const mockEventEmiter = () => ({
  once: jest.fn(),
  on: jest.fn(),
  onAny: jest.fn(),
  addListener: jest.fn(),
  off: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  emit: jest.fn(),
});

export const mockPopupUploadEventEmitter = () => ({
  emitReady: jest.fn(),
  emitClosed: jest.fn(),
  emitUploadsStart: jest.fn(),
  emitUploadProgress: jest.fn(),
  emitUploadPreviewUpdate: jest.fn(),
  emitUploadProcessing: jest.fn(),
  emitUploadEnd: jest.fn(),
  emitUploadError: jest.fn(),
});

export interface PropsWithStore {
  store?: Store<any>;
}

/**
 * Connected (react-redux) components allow to provide "store" as prop directly (without specifying
 * store Provider wrapper). But current type definition doesn't allow for that.
 * This function takes React Component class and return one identical, but with additional store prop)
 */
export function getComponentClassWithStore<P>(
  componentClass: React.ComponentClass<P>,
): React.ComponentClass<P & PropsWithStore> {
  return componentClass as React.ComponentClass<P & PropsWithStore>;
}
