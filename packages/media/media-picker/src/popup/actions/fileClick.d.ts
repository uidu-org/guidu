import { Action } from 'redux';
import { ServiceFile, SelectedItem, ServiceName } from '../domain';
export declare const FILE_CLICK = "FILE_CLICK";
export interface FileClickAction {
    readonly type: 'FILE_CLICK';
    readonly file: SelectedItem;
}
export declare function isFileClickAction(action: Action): action is FileClickAction;
export declare function fileClick(file: ServiceFile, serviceName: ServiceName, accountId?: string): FileClickAction;
