import { Store, Middleware } from 'redux';
import { GetPreviewAction } from '../actions/getPreview';
import { State } from '../domain';
export default function (): Middleware;
export declare function getPreview(store: Store<State>, action: GetPreviewAction): Promise<void>;
