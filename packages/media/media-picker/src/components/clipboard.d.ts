import { Context } from '@uidu/media-core';
import { LocalUploadComponent } from './localUpload';
import { Clipboard, ClipboardConfig } from './types';
export declare const getFilesFromClipboard: (files: FileList) => File[];
export declare class ClipboardImpl extends LocalUploadComponent implements Clipboard {
    constructor(context: Context, config?: ClipboardConfig);
    activate(): Promise<void>;
    deactivate(): void;
    private pasteHandler;
}
