import { StateWatch } from '../../stateWatcher';
import { Store } from '../../store';

const getTimeMock = jest.fn().mockReturnValue(1);

describe('Store', () => {
  it('should init the array of values for a key', () => {
    const store = new Store(getTimeMock);
    const data1 = store.init('a');
    expect(data1).toBeInstanceOf(StateWatch);
    const data2 = store.get('a');
    expect(data2).toBeTruthy();
    expect(data2).toBeInstanceOf(StateWatch);
  });

  it('should throw if setting on the key that has not been initted', () => {
    const store = new Store(getTimeMock);
    expect(() => store.set('a', {}, 1)).toThrowError(
      'Set for non-existent url: a',
    );
  });

  it('should return the list of urls', () => {
    const store = new Store(getTimeMock);
    store.init('a');
    store.init('b');
    store.init('c');
    expect(store.getAllUrls()).toEqual(['a', 'b', 'c']);
  });
});
