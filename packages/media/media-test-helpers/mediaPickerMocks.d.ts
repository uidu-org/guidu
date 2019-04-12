/// <reference types="jest" />
/// <reference types="react" />
import { State } from '@atlaskit/media-picker/src/popup/domain';
import { Store } from 'react-redux';
export declare const mockState: State;
export declare const mockStore: (state?: Partial<any>) => {
    dispatch: jest.Mock<any, any>;
    getState: () => any;
    subscribe: jest.Mock<any, any>;
    replaceReducer: jest.Mock<any, any>;
};
export declare const mockChannel: () => {
    listen: jest.Mock<any, any>;
    send: jest.Mock<any, any>;
    ready: jest.Mock<any, any>;
    destroy: jest.Mock<any, any>;
};
export declare const mockProvider: jest.Mock<{
    observable: () => any;
}, []>;
export declare const mockAuthProvider: jest.Mock<any, any>;
export declare const mockFetcher: () => {
    fetchCloudAccountFolder: jest.Mock<any, any>;
    pollFile: jest.Mock<any, any>;
    getPreview: jest.Mock<any, any>;
    getImage: jest.Mock<any, any>;
    getServiceList: jest.Mock<any, any>;
    getRecentFiles: jest.Mock<any, any>;
    unlinkCloudAccount: jest.Mock<any, any>;
    fetchCloudAccountFile: jest.Mock<any, any>;
    copyFile: jest.Mock<any, any>;
    fetchTrendingGifs: jest.Mock<any, any>;
    fetchGifsRelevantToSearch: jest.Mock<any, any>;
};
export declare const mockIsWebGLNotAvailable: () => void;
export declare const mockWsConnectionHolder: () => {
    openConnection: jest.Mock<any, any>;
    send: jest.Mock<any, any>;
};
export declare const mockEventEmiter: () => {
    once: jest.Mock<any, any>;
    on: jest.Mock<any, any>;
    onAny: jest.Mock<any, any>;
    addListener: jest.Mock<any, any>;
    off: jest.Mock<any, any>;
    removeListener: jest.Mock<any, any>;
    removeAllListeners: jest.Mock<any, any>;
    emit: jest.Mock<any, any>;
};
export declare const mockPopupUploadEventEmitter: () => {
    emitReady: jest.Mock<any, any>;
    emitClosed: jest.Mock<any, any>;
    emitUploadsStart: jest.Mock<any, any>;
    emitUploadProgress: jest.Mock<any, any>;
    emitUploadPreviewUpdate: jest.Mock<any, any>;
    emitUploadProcessing: jest.Mock<any, any>;
    emitUploadEnd: jest.Mock<any, any>;
    emitUploadError: jest.Mock<any, any>;
};
export interface PropsWithStore {
    store?: Store<any>;
}
/**
 * Connected (react-redux) components allow to provide "store" as prop directly (without specifying
 * store Provider wrapper). But current type definition doesn't allow for that.
 * This function takes React Component class and return one identical, but with additional store prop)
 */
export declare function getComponentClassWithStore<P>(componentClass: React.ComponentClass<P>): React.ComponentClass<P & PropsWithStore>;
