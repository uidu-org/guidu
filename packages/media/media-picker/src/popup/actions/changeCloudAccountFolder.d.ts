import { Action } from 'redux';
import { ServiceName, Path } from '../domain';
export declare const CHANGE_CLOUD_ACCOUNT_FOLDER = "CHANGE_CLOUD_ACCOUNT_FOLDER";
export interface ChangeCloudAccountFolderAction {
    readonly type: 'CHANGE_CLOUD_ACCOUNT_FOLDER';
    readonly serviceName: ServiceName;
    readonly accountId: string;
    readonly path: Path;
}
export declare function changeCloudAccountFolder(serviceName: ServiceName, accountId: string, path: Path): ChangeCloudAccountFolderAction;
export declare function isChangeCloudAccountFolderAction(action: Action): action is ChangeCloudAccountFolderAction;
