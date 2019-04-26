import { Component } from 'react';
import { Store } from 'redux';
import { IntlShape } from 'react-intl';
import { Context } from '@uidu/media-core';
import { UIAnalyticsEventHandlerSignature, ObjectType } from '@atlaskit/analytics-next-types';
import { ServiceName, State } from '../domain';
import { UploadParams, PopupConfig } from '../..';
import { StartAppActionPayload } from '../actions/startApp';
import { UploadsStartEventPayload, UploadPreviewUpdateEventPayload, UploadStatusUpdateEventPayload, UploadProcessingEventPayload, UploadEndEventPayload, UploadErrorEventPayload } from '../../domain/uploadEvent';
import { DropzoneDragEnterEventPayload, DropzoneDragLeaveEventPayload } from '../../components/types';
export interface AppStateProps {
    readonly selectedServiceName: ServiceName;
    readonly isVisible: boolean;
    readonly tenantContext: Context;
    readonly userContext: Context;
    readonly config?: Partial<PopupConfig>;
}
export interface AppDispatchProps {
    readonly onStartApp: (payload: StartAppActionPayload) => void;
    readonly onClose: () => void;
    readonly onUploadsStart: (payload: UploadsStartEventPayload) => void;
    readonly onUploadPreviewUpdate: (payload: UploadPreviewUpdateEventPayload) => void;
    readonly onUploadStatusUpdate: (payload: UploadStatusUpdateEventPayload) => void;
    readonly onUploadProcessing: (payload: UploadProcessingEventPayload) => void;
    readonly onUploadEnd: (payload: UploadEndEventPayload) => void;
    readonly onUploadError: (payload: UploadErrorEventPayload) => void;
    readonly onDropzoneDragIn: (fileCount: number) => void;
    readonly onDropzoneDragOut: (fileCount: number) => void;
    readonly onDropzoneDropIn: (fileCount: number) => void;
}
export interface AppProxyReactContext {
    getAtlaskitAnalyticsEventHandlers: () => UIAnalyticsEventHandlerSignature[];
    getAtlaskitAnalyticsContext?: () => ObjectType[];
    intl?: IntlShape;
}
export interface AppOwnProps {
    store: Store<State>;
    tenantUploadParams: UploadParams;
    proxyReactContext?: AppProxyReactContext;
}
export declare type AppProps = AppStateProps & AppOwnProps & AppDispatchProps;
export interface AppState {
    readonly isDropzoneActive: boolean;
}
export declare class App extends Component<AppProps, AppState> {
    private readonly mpBrowser;
    private readonly mpDropzone;
    private readonly mpBinary;
    constructor(props: AppProps);
    onDragLeave: (payload: DropzoneDragLeaveEventPayload) => void;
    onDragEnter: (payload: DropzoneDragEnterEventPayload) => void;
    onDrop: (payload: UploadsStartEventPayload) => void;
    componentWillReceiveProps({ isVisible }: Readonly<AppProps>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private renderCurrentView;
    private setDropzoneActive;
}
declare const _default: any;
export default _default;
