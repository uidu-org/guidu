import { Component } from 'react';
import { Path, SelectedItem, ServiceAccountLink, ServiceFile, ServiceFolderItem, ServiceName } from '../../../../domain';
export interface FolderViewerStateProps {
    readonly path: Path;
    readonly service: ServiceAccountLink;
    readonly items: ServiceFolderItem[];
    readonly selectedItems: SelectedItem[];
    readonly isLoading: boolean;
    readonly currentCursor?: string;
    readonly nextCursor?: string;
}
export interface FolderViewDispatchProps {
    readonly onFolderClick: (serviceName: ServiceName, accountId: string, path: Path) => void;
    readonly onFileClick: (serviceName: ServiceName, accountId: string, file: ServiceFile) => void;
    readonly onLoadMoreClick: (serviceName: ServiceName, accountId: string, path: Path, nextCursor: string) => void;
    readonly setUpfrontIdDeferred: (id: string, resolver: (id: string) => void, rejecter: Function) => void;
}
export declare type FolderViewerProps = FolderViewerStateProps & FolderViewDispatchProps;
/**
 * Routing class that displays view depending on situation.
 */
export declare class FolderViewer extends Component<FolderViewerProps, {}> {
    render(): JSX.Element;
    private renderContents;
    private readonly isPageInitialLoading;
    private readonly isPageMoreLoading;
    private renderFolderContent;
    private renderServiceFolder;
    private renderServiceFile;
    private renderFileCreateDateAndSize;
    private renderLoadMoreButton;
    private onLoadMoreButtonClick;
    private itemClicked;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof FolderViewer, Pick<FolderViewerProps, never>>;
export default _default;
