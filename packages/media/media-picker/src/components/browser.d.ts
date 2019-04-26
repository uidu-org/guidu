import { LocalUploadComponent } from './localUpload';
import { Context } from '@uidu/media-core';
import { Browser, BrowserConfig } from './types';
export declare class BrowserImpl extends LocalUploadComponent implements Browser {
    private readonly browseElement;
    constructor(context: Context, browserConfig?: BrowserConfig);
    private addEvents;
    private removeEvents;
    private onFilePicked;
    browse(): void;
    teardown(): void;
}
