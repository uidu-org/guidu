import { StateWatch } from './stateWatcher';
import { GetNowTimeFn } from './types';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import { F1 } from './utils';

export class Store<T> {
  constructor(private getNowTimeFn: GetNowTimeFn) {}

  store: { [K: string]: StateWatch<T> } = {};
  analyticsCallbacksPool: { [K: string]: Array<F1<GasPayload, any>> } = {};

  get(url: string): StateWatch<T> | undefined {
    return this.store[url];
  }

  getAllUrls(): string[] {
    return Object.keys(this.store);
  }

  init(url: string): StateWatch<T> {
    if (this.store[url]) {
      throw new Error(`Reinit the watcher for url: ${url}`);
    }
    return (this.store[url] = new StateWatch(this.getNowTimeFn));
  }

  set(url: string, data: T, lifespan: number): void {
    if (!this.store[url]) {
      throw new Error(`Set for non-existent url: ${url}`);
    }
    return this.store[url].update(data, lifespan);
  }

  exists(url: string): boolean {
    return this.store[url] !== undefined;
  }
}
