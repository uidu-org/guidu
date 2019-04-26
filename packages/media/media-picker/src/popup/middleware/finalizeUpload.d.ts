import { Store, Middleware } from 'redux';
import { Fetcher } from '../tools/fetcher/fetcher';
import { FinalizeUploadAction } from '../actions/finalizeUpload';
import { State } from '../domain';
import { SendUploadEventAction } from '../actions/sendUploadEvent';
export default function (fetcher: Fetcher): Middleware;
export declare function finalizeUpload(fetcher: Fetcher, store: Store<State>, { file, uploadId, source, replaceFileId }: FinalizeUploadAction): Promise<SendUploadEventAction>;
