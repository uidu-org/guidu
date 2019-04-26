import { State } from './domain';
export declare type DefaultStateKeys = 'uploads' | 'remoteUploads' | 'recents' | 'view' | 'accounts' | 'selectedItems' | 'isUploading' | 'isCancelling' | 'lastUploadIndex' | 'giphy' | 'onCancelUpload' | 'deferredIdUpfronts';
export declare type DefaultState = Pick<State, DefaultStateKeys>;
declare const defaultState: DefaultState;
export default defaultState;
