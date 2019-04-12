import * as React from 'react';
import { Outcome } from '../../domain';
import { MediaViewerError } from '../../error';
import { ZoomLevel } from '../../domain/zoomLevel';
export declare const pdfViewerClassName = "pdfViewer";
export declare type Props = {
    src: string;
    onClose?: () => void;
};
export declare type State = {
    doc: Outcome<any, MediaViewerError>;
    zoomLevel: ZoomLevel;
};
export declare class PDFRenderer extends React.Component<Props, State> {
    private el?;
    private pdfViewer;
    state: State;
    componentDidMount(): void;
    private init;
    private savePdfElement;
    private handleZoom;
    private scaleToFit;
    render(): JSX.Element;
}
