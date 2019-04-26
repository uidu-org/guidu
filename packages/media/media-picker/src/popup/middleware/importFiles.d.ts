import { Store, Middleware } from 'redux';
import { TouchFileDescriptor } from '@uidu/media-core';
import { State, SelectedItem, LocalUpload, ServiceName } from '../domain';
import { WsProvider } from '../tools/websocket/wsProvider';
import { WsConnectionHolder } from '../tools/websocket/wsConnectionHolder';
import { MediaFile } from '../../domain/file';
import { PopupUploadEventEmitter } from '../../components/types';
export interface RemoteFileItem extends SelectedItem {
    accountId: string;
    publicId: string;
}
export declare const isRemoteFileItem: (item: SelectedItem) => item is RemoteFileItem;
export declare const isRemoteService: (serviceName: ServiceName) => boolean;
export declare type SelectedUploadFile = {
    readonly file: MediaFile;
    readonly serviceName: ServiceName;
    readonly touchFileDescriptor: TouchFileDescriptor;
    readonly accountId?: string;
};
export declare function importFilesMiddleware(eventEmitter: PopupUploadEventEmitter, wsProvider: WsProvider): Middleware;
export declare const touchSelectedFiles: (selectedUploadFiles: SelectedUploadFile[], store: Store<State, import("redux").AnyAction>) => void;
export declare function importFiles(eventEmitter: PopupUploadEventEmitter, store: Store<State>, wsProvider: WsProvider): Promise<void>;
export declare const importFilesFromLocalUpload: (selectedItemId: string, uploadId: string, store: Store<State, import("redux").AnyAction>, localUpload: LocalUpload, replaceFileId?: string) => void;
export declare const importFilesFromRecentFiles: (selectedUploadFile: SelectedUploadFile, store: Store<State, import("redux").AnyAction>) => void;
export declare const importFilesFromRemoteService: (selectedUploadFile: SelectedUploadFile, store: Store<State, import("redux").AnyAction>, wsConnectionHolder: WsConnectionHolder) => void;
