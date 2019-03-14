import FileStreamCache from '../../context/fileStreamCache';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

describe('FileStreamCache', () => {
  it('should return the stream if already exist', () => {
    const cache = new FileStreamCache();
    const fileStream1 = Observable.create();

    cache.set('1', fileStream1);

    expect(cache.has('1')).toBeTruthy();
    expect(cache.has('2')).toBeFalsy();
    expect(cache.get('1')).toEqual(fileStream1);
  });

  describe('getCurrentState()', () => {
    it('should resolve with existing state if there was something already', async () => {
      const cache = new FileStreamCache();
      const subject = new ReplaySubject(1);

      subject.next({
        id: '2',
      });
      subject.complete();
      cache.set('2', subject as Observable<any>);
      expect(await cache.getCurrentState('2')).toEqual({
        id: '2',
      });
    });

    it('should eventually resolve when a state is updated', async () => {
      const cache = new FileStreamCache();
      const subject = new ReplaySubject(1);
      const state = cache.getCurrentState('2');

      subject.next({ id: '2' });
      subject.complete();
      cache.set('2', subject as Observable<any>);
      expect(await state).toEqual({
        id: '2',
      });
    });
  });
});
