import { GasPayload } from '@atlaskit/analytics-gas-types';
import { ProcessedFileState, FileState } from '@uidu/media-core';
export declare type ViewerLoadPayload = {
    status: 'success' | 'error';
    errorMessage?: string;
};
export declare type AnalyticViewerProps = {
    onLoad: (payload: ViewerLoadPayload) => void;
};
export declare const mediaFileCommencedEvent: (id: string) => GasPayload;
export declare const mediaFileLoadSucceededEvent: (file: ProcessedFileState) => GasPayload;
export declare const mediaFileLoadFailedEvent: (id: string, failReason: string, file?: ProcessedFileState) => GasPayload;
export declare const mediaPreviewFailedEvent: (failReason: string, id?: string, file?: FileState) => GasPayload;
