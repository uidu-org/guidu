import { FileState } from '../fileState';
import { Observable } from 'rxjs/Observable';
export declare class FileStreamCache {
    private readonly fileStreams;
    private readonly stateDeferreds;
    constructor();
    has(id: string): boolean;
    set(id: string, fileStream: Observable<FileState>): void;
    get(id: string): Observable<FileState> | undefined;
    getCurrentState(id: string): Promise<FileState>;
    getOrInsert(id: string, callback: () => Observable<FileState>): Observable<FileState>;
    removeAll(): void;
    remove(id: string): void;
    readonly size: number;
}
export declare const fileStreamsCache: FileStreamCache;
export default FileStreamCache;
