import { mockStore, mockFetcher } from '@uidu/media-test-helpers';
import {
  getFilesInRecentsFullfilled,
  getFilesInRecentsFailed,
  saveCollectionItemsSubscription,
} from '../../../actions';

import { getFilesInRecents, requestRecentFiles } from '../../getFilesInRecents';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Observer } from 'rxjs/Observer';

describe('getFilesInRecents middleware', () => {
  describe('getFilesInRecents()', () => {
    it('should ignore actions which are NOT type GET_FILES_IN_RECENTS', () => {
      const fetcher = mockFetcher();
      const store = mockStore();
      const next = jest.fn();

      const unknownAction = { type: 'UNKNOWN' };
      getFilesInRecents()(store)(next)(unknownAction);

      expect(fetcher.getRecentFiles).toHaveBeenCalledTimes(0);
      expect(store.dispatch).toHaveBeenCalledTimes(0);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(unknownAction);
    });
  });

  describe('requestRecentFiles()', () => {
    it('should dispatch GET_FILES_IN_RECENTS_FAILED when collection.getItems rejects', async () => {
      const getItems = jest
        .fn()
        .mockReturnValue(
          Observable.create((observer: Observer<any>) => observer.error('')),
        );
      const store = mockStore({
        userContext: {
          collection: {
            getItems,
          },
        },
      } as any);

      await requestRecentFiles(store);

      expect(getItems).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith(getFilesInRecentsFailed());
    });

    it('should dispatch GET_FILES_IN_RECENTS_SUCCESS when requests succeed', async () => {
      const getItems = jest.fn().mockReturnValue(of([]));
      const store = mockStore({
        userContext: {
          collection: {
            getItems,
          },
        },
      } as any);

      await requestRecentFiles(store);

      expect(getItems).toHaveBeenCalledTimes(1);
      expect(getItems).toBeCalledWith('recents');
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith(
        getFilesInRecentsFullfilled([]),
      );
    });

    it('should clear previous subscription', async () => {
      const collectionItemsSubscription = { unsubscribe: jest.fn() };
      const getItems = jest.fn().mockReturnValue(of([]));
      const store = mockStore({
        userContext: {
          collection: {
            getItems,
          },
        },
        collectionItemsSubscription,
      } as any);

      await requestRecentFiles(store);

      expect(collectionItemsSubscription.unsubscribe).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[1][0]).toEqual(
        saveCollectionItemsSubscription(expect.anything()),
      );
    });
  });
});
