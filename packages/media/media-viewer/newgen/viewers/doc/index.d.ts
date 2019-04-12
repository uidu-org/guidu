import { Context, FileState } from '@uidu/media-core';
import { Outcome } from '../../domain';
import { MediaViewerError } from '../../error';
import { Props as RendererProps } from './pdfRenderer';
import { ComponentClass } from 'react';
import { BaseViewer } from '../base-viewer';
export declare type Props = {
    context: Context;
    item: FileState;
    collectionName?: string;
    onClose?: () => void;
};
export declare type State = {
    content: Outcome<string, MediaViewerError>;
};
export declare class DocViewer extends BaseViewer<string, Props> {
    static PDFComponent: ComponentClass<RendererProps>;
    protected readonly initialState: {
        content: Outcome<string, MediaViewerError>;
    };
    protected init(): Promise<void>;
    private loadDocViewer;
    protected release(): void;
    protected renderSuccessful(content: string): JSX.Element;
}
