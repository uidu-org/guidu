import { Context } from '@uidu/media-core';
import { UploadComponent } from './component';
import { UploadParams } from '../domain/config';
import { PopupUploadEventPayloadMap, Popup, PopupUploadEventEmitter, PopupConfig } from './types';
export declare class PopupImpl extends UploadComponent<PopupUploadEventPayloadMap> implements PopupUploadEventEmitter, Popup {
    readonly tenantContext: Context;
    private readonly container?;
    private readonly store;
    private tenantUploadParams;
    private proxyReactContext?;
    constructor(tenantContext: Context, { container, uploadParams, // tenant
    proxyReactContext, singleSelect, }: PopupConfig);
    show(): Promise<void>;
    cancel(uniqueIdentifier?: string | Promise<string>): Promise<void>;
    teardown(): void;
    hide(): void;
    setUploadParams(uploadParams: UploadParams): void;
    emitClosed(): void;
    private renderPopup;
}
