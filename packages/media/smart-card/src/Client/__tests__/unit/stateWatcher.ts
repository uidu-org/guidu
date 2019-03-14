import { v4 } from 'uuid';
import { StateWatch } from '../../stateWatcher';
import { GetNowTimeFn } from '../../types';

const getNow = (nows: number[]) => () => nows.shift() || new Date().getTime();

describe('StateWatch', () => {
  describe('subscribe and update', () => {
    it('should be able to be subscribed to', () => {
      const getNowFn: GetNowTimeFn = () => 1;
      const watcher = new StateWatch(getNowFn);
      const callback = jest.fn();
      const uuid = v4();
      const payload = { some: 'data' };

      watcher.subscribe(uuid, callback);
      watcher.update(payload, 1);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback.mock.calls).toEqual([[[null, true]], [[payload, false]]]);
    });
  });

  describe('subscribe, update and unsubscribe', () => {
    it('should not call the unsubscribed listener', () => {
      const watcher = new StateWatch(() => 1);
      const card1 = {
        uuid: v4(),
        update: jest.fn(),
      };
      const card2 = {
        uuid: v4(),
        update: jest.fn(),
      };
      watcher.subscribe(card1.uuid, card1.update);
      watcher.subscribe(card2.uuid, card2.update);

      expect(card1.update).toHaveBeenCalledTimes(1);
      expect(card2.update).toHaveBeenCalledTimes(1);

      watcher.unsubscribe(card1.uuid);
      watcher.update({ some: 'data' }, 1);

      expect(card1.update).toHaveBeenCalledTimes(1);
      expect(card2.update).toHaveBeenCalledTimes(2);
    });
  });

  describe('hasExpired', () => {
    it('should return true if entity timestamp is of smaller value than current time', () => {
      const watcher = new StateWatch(getNow([1, 10]));

      watcher.update({ some: 'data' }, 1);
      expect(watcher.hasExpired()).toBeTruthy();
    });

    it('should return false if entity timestamp is of smaller value than current time', () => {
      const watcher = new StateWatch(getNow([1, 10]));

      watcher.update({ some: 'data' }, 10);
      expect(watcher.hasExpired()).toBeFalsy();
    });
  });

  describe('invalidate and hasExpired', () => {
    it('should invalidate the stored cache', () => {
      const watcher = new StateWatch(getNow([1, 2, 3, 4]));
      watcher.update({ some: 'data' }, 1); // data is good till 2
      expect(watcher.hasExpired()).toBeFalsy(); // 2 < 2
      watcher.invalidate(); // data is good till 3 - 1 => 2
      expect(watcher.hasExpired()).toBeTruthy(); // 2 < 4
    });
  });
});
