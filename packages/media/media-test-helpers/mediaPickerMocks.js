import * as tslib_1 from "tslib";
import { Observable } from 'rxjs/Observable';
import { fakeContext } from './fakeContextProvider';
export var mockState = {
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
export var mockStore = function (state) { return ({
    dispatch: jest.fn().mockImplementation(function (action) { return action; }),
    getState: jest.fn().mockReturnValue(tslib_1.__assign({}, mockState, state)),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
}); };
export var mockChannel = function () {
    var channel = {
        listen: jest.fn(),
        send: jest.fn(),
        ready: jest.fn(),
        destroy: jest.fn(),
    };
    channel.ready.mockImplementation(function (callback) { return callback(); });
    return channel;
};
export var mockProvider = jest.fn(function () { return ({
    observable: function () {
        return Observable.create();
    },
}); });
export var mockAuthProvider = jest
    .fn()
    .mockReturnValue(Promise.resolve({ clientId: 'some-client-id', token: 'some-token' }));
export var mockFetcher = function () { return ({
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
}); };
export var mockIsWebGLNotAvailable = function () {
    jest.mock('@atlaskit/media-picker/src/popup/tools/webgl', function () {
        return {
            isWebGLAvailable: jest.fn(function () {
                return false;
            }),
        };
    });
};
export var mockWsConnectionHolder = function () { return ({
    openConnection: jest.fn(),
    send: jest.fn(),
}); };
export var mockEventEmiter = function () { return ({
    once: jest.fn(),
    on: jest.fn(),
    onAny: jest.fn(),
    addListener: jest.fn(),
    off: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    emit: jest.fn(),
}); };
export var mockPopupUploadEventEmitter = function () { return ({
    emitReady: jest.fn(),
    emitClosed: jest.fn(),
    emitUploadsStart: jest.fn(),
    emitUploadProgress: jest.fn(),
    emitUploadPreviewUpdate: jest.fn(),
    emitUploadProcessing: jest.fn(),
    emitUploadEnd: jest.fn(),
    emitUploadError: jest.fn(),
}); };
/**
 * Connected (react-redux) components allow to provide "store" as prop directly (without specifying
 * store Provider wrapper). But current type definition doesn't allow for that.
 * This function takes React Component class and return one identical, but with additional store prop)
 */
export function getComponentClassWithStore(componentClass) {
    return componentClass;
}
//# sourceMappingURL=mediaPickerMocks.js.map