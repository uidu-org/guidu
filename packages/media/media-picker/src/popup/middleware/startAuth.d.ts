import { Store, Dispatch } from 'redux';
import { StartAuthAction } from '../actions';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
import { CloudService } from '../services/cloud-service';
export declare const startCloudAccountOAuthFlow: (fetcher: Fetcher, cloudService: CloudService) => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: StartAuthAction) => any;
