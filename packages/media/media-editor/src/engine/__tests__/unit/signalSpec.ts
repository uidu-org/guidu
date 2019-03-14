import { Signal } from '../../signal';

interface SignalData {
  message: string;
}

const someData = { message: 'some-message' };

describe('MediaEditor Signal', () => {
  it('should successfully emit with no handler', () => {
    const signal = new Signal<SignalData>();
    signal.emit(someData);
  });

  it('should successfully call reset with no handler', () => {
    const signal = new Signal<SignalData>();
    signal.reset();
  });

  it('should successfully emit with handler', done => {
    const signal = new Signal<SignalData>();
    signal.listen(data => {
      expect(data).toEqual(someData);
      done();
    });
    signal.emit(someData);
  });

  it('should not call handler after reset', () => {
    const signal = new Signal<SignalData>();
    signal.listen(() => {
      throw new Error('This handler must not be called');
    });
    signal.reset();
    signal.emit(someData);
  });

  it('should call second handler after listen twice', done => {
    const signal = new Signal<SignalData>();
    signal.listen(() => {
      throw new Error('This handler must not be called');
    });
    signal.listen(data => {
      expect(data).toEqual(someData);
      done();
    });
    signal.emit(someData);
  });
});
