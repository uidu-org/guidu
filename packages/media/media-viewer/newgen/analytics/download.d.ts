import { GasPayload } from '@atlaskit/analytics-gas-types';
import { FileGasPayload, PackageAttributes } from './index';
import { FileState, FileStatus } from '@uidu/media-core';
import { MediaViewerError } from '../error';
interface DownloadAttributes extends FileGasPayload {
    fileSupported?: boolean;
    fileProcessingStatus: FileStatus;
}
export interface DownloadGasPayload extends GasPayload {
    attributes: DownloadAttributes & PackageAttributes;
}
export declare function downloadErrorButtonEvent(state: FileState, err: MediaViewerError): DownloadGasPayload;
export declare function downloadButtonEvent(state: FileState): DownloadGasPayload;
export {};
