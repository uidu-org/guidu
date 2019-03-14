import {
  MediaCollectionItem,
  MediaCollectionItemDetails,
} from '@uidu/media-store';
import { nextTick } from '@uidu/media-test-helpers';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { CollectionFetcher, collectionCache } from '../../collection';
import { fileStreamsCache } from '../../context/fileStreamCache';

const setup = (nextInclusiveStartKey: string | null = 'first-key') => {
  const firstItem: MediaCollectionItem = {
    id: '1',
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: 'png',
      name: 'foo',
      processingStatus: 'processing',
      size: 1,
    },
    insertedAt: 1,
    occurrenceKey: '12',
  };
  const secondItem: MediaCollectionItem = {
    id: '2',
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: 'png',
      name: 'bar',
      processingStatus: 'processed',
      size: 1,
    },
    insertedAt: 1,
    occurrenceKey: '123',
  };
  const newItem: MediaCollectionItem = {
    id: '0',
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: 'png',
      name: 'bar',
      processingStatus: 'processing',
      size: 1,
    },
    insertedAt: 1,
    occurrenceKey: '1234',
  };
  const contents: MediaCollectionItem[] = [firstItem, secondItem];
  const getCollectionItems = jest.fn().mockResolvedValue({
    data: {
      contents,
      nextInclusiveStartKey,
    },
  });
  const removeCollectionFile = jest.fn().mockResolvedValue({});
  const mediaStore: any = {
    getCollectionItems,
    removeCollectionFile,
  };
  const collectionFetcher = new CollectionFetcher(mediaStore);

  return {
    collectionFetcher,
    getCollectionItems,
    removeCollectionFile,
    contents,
    newItem,
  };
};

describe('CollectionFetcher', () => {
  beforeEach(() => {
    fileStreamsCache.removeAll();
    delete collectionCache.recents;
  });

  describe('getItems()', () => {
    it('should fetch items from the given collection', done => {
      const { collectionFetcher, contents, getCollectionItems } = setup();

      collectionFetcher.getItems('recents').subscribe({
        next(items) {
          expect(items).toEqual(contents);
          expect(getCollectionItems).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });

    it('should replace items with the local ones', async done => {
      const { collectionFetcher, getCollectionItems, newItem } = setup();

      collectionFetcher.getItems('recents').subscribe({
        next() {
          getCollectionItems.mockReturnValue(
            Promise.resolve({
              data: {
                contents: [newItem],
                nextInclusiveStartKey: '1',
              },
            }),
          );
        },
      });
      await nextTick();
      collectionFetcher.getItems('recents').subscribe({
        next(items) {
          if (items.length === 1) {
            expect(items).toEqual([newItem]);
            expect(getCollectionItems).toHaveBeenCalledTimes(2);
            done();
          }
        },
      });
    });

    it('should populate cache', done => {
      const { collectionFetcher } = setup();

      expect(fileStreamsCache.size).toEqual(0);
      collectionFetcher.getItems('recents').subscribe({
        next() {
          expect(fileStreamsCache.size).toEqual(2);
          expect(fileStreamsCache.has('1')).toBeTruthy();
          expect(fileStreamsCache.has('2')).toBeTruthy();
          done();
        },
      });
    });

    it('should make request with given options', done => {
      const { collectionFetcher, getCollectionItems } = setup();

      collectionFetcher
        .getItems('recents', {
          limit: 1,
          sortDirection: 'asc',
        })
        .subscribe({
          next() {
            expect(getCollectionItems).toHaveBeenCalledTimes(1);
            expect(getCollectionItems).toHaveBeenCalledWith('recents', {
              details: 'full',
              limit: 1,
              sortDirection: 'asc',
            });
            done();
          },
        });
    });

    it('should update nextInclusiveStartKey only the first time', async done => {
      const { collectionFetcher, getCollectionItems, contents } = setup();

      expect(collectionCache.recents).toBeUndefined();
      collectionFetcher.getItems('recents').subscribe({
        next() {
          getCollectionItems.mockReturnValue(
            Promise.resolve({
              data: {
                contents,
                nextInclusiveStartKey: 'new-key',
              },
            }),
          );
        },
      });
      await nextTick();
      collectionFetcher.getItems('recents').subscribe({
        next() {
          expect(collectionCache.recents.nextInclusiveStartKey).toEqual(
            'first-key',
          );
          done();
        },
      });
    });

    it('should call error callback if call to /items fails', done => {
      const { collectionFetcher } = setup();

      collectionFetcher.mediaStore.getCollectionItems = jest
        .fn()
        .mockReturnValue(Promise.reject());

      collectionFetcher.getItems('recents').subscribe({
        error() {
          expect(
            collectionFetcher.mediaStore.getCollectionItems,
          ).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });
  });

  describe('loadNextPage()', () => {
    it('should update nextInclusiveStartKey', async done => {
      const { collectionFetcher, getCollectionItems, contents } = setup();

      collectionFetcher.getItems('recents').subscribe({
        async next() {
          getCollectionItems.mockReturnValue(
            Promise.resolve({
              data: {
                contents,
                nextInclusiveStartKey: 'new-key',
              },
            }),
          );

          await collectionFetcher.loadNextPage('recents');

          expect(collectionCache.recents.nextInclusiveStartKey).toEqual(
            'new-key',
          );
          done();
        },
      });
    });

    it('should do nothing if the page is already being fetched', done => {
      const { collectionFetcher, getCollectionItems } = setup();

      collectionFetcher.getItems('recents').subscribe({
        async next() {
          collectionFetcher.loadNextPage('recents');
          collectionFetcher.loadNextPage('recents');
          collectionFetcher.loadNextPage('recents');

          expect(getCollectionItems).toHaveBeenCalledTimes(2);
          done();
        },
      });
    });

    it('should append new items', async done => {
      const {
        collectionFetcher,
        getCollectionItems,
        newItem,
        contents,
      } = setup();

      collectionFetcher.getItems('recents').subscribe({
        async next(items) {
          if (items.length === 3) {
            expect(items).toEqual([...contents, newItem]);
            done();
          }
        },
      });

      await nextTick();

      getCollectionItems.mockReturnValue(
        Promise.resolve({
          data: {
            contents: [newItem],
            nextInclusiveStartKey: 'new-key',
          },
        }),
      );

      await collectionFetcher.loadNextPage('recents');
    });

    it('should not fetch next page items if current page nextInclusiveStartKey is null', done => {
      const { collectionFetcher, getCollectionItems } = setup(null);

      collectionFetcher.getItems('recents').subscribe({
        async next() {
          expect(getCollectionItems).toHaveBeenCalledTimes(1);
          collectionFetcher.loadNextPage('recents');
          expect(getCollectionItems).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });
  });

  describe('removeFile()', () => {
    beforeEach(() => {
      collectionCache['some-collection-name'] = {
        items: [
          {
            id: 'some-id',
            insertedAt: 42,
            occurrenceKey: '',
            details: {} as MediaCollectionItemDetails,
          },
        ],
        subject: new ReplaySubject<MediaCollectionItem[]>(1),
        isLoadingNextPage: false,
      };
    });

    it('should call store.removeCollectionFile', async () => {
      const { collectionFetcher, removeCollectionFile } = setup();
      await collectionFetcher.removeFile(
        'some-id',
        'some-collection-name',
        'some-occurrence-key',
      );

      expect(removeCollectionFile).toHaveBeenCalledWith(
        'some-id',
        'some-collection-name',
        'some-occurrence-key',
      );
    });
    it('should remove item from cache', async () => {
      const { collectionFetcher } = setup();

      const removeSpy = spyOn(fileStreamsCache, 'remove');
      await collectionFetcher.removeFile(
        'some-id',
        'some-collection-name',
        'some-occurrence-key',
      );
      expect(collectionCache['some-collection-name'].items).toHaveLength(0);
      expect(removeSpy).toHaveBeenCalledWith('some-id');
    });

    it('should propagate the change in cached observable', async () => {
      const { collectionFetcher } = setup();

      const updatedItems = await new Promise(async resolve => {
        collectionCache['some-collection-name'].subject.subscribe({
          next: items => {
            resolve(items);
          },
        });

        await collectionFetcher.removeFile(
          'some-id',
          'some-collection-name',
          'some-occurrence-key',
        );
      });
      expect(updatedItems).toEqual([]);
    });
  });
});
