import { Component } from 'react';
import { Browser } from '../../../../components/types';
export interface DropzoneProps {
    readonly isEmpty?: boolean;
    readonly mpBrowser: Browser;
}
export declare class Dropzone extends Component<DropzoneProps> {
    render(): JSX.Element;
}
