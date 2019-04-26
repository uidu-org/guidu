import { Action } from 'redux';
import { Path, ServiceFolderItem, ServiceName } from '../domain';
export declare const FILE_LIST_UPDATE = "FILE_LIST_UPDATE";
export interface FileListUpdateAction {
    readonly type: 'FILE_LIST_UPDATE';
    readonly accountId: string;
    readonly path: Path;
    readonly items: ServiceFolderItem[];
    readonly serviceName: ServiceName;
    readonly currentCursor?: string;
    readonly nextCursor?: string;
}
export declare function isFileListUpdateAction(action: Action): action is FileListUpdateAction;
export declare function fileListUpdate(accountId: string, path: Path, items: ServiceFolderItem[], serviceName: ServiceName, currentCursor?: string, nextCursor?: string): FileListUpdateAction;
