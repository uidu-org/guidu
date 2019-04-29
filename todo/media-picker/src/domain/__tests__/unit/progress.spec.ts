import { SmartMediaProgress } from '../../progress';

describe('Progress class check', () => {
  /* isValidSize */
  it('method isValidSize() returns true for numbers bigger then zero', () => {
    expect(SmartMediaProgress.isValidSize(1)).toBeTruthy();
  });

  it('method isValidSize() returns false for numbers less or equal zero', () => {
    expect(SmartMediaProgress.isValidSize(0)).toBeFalsy();
  });

  it('method isValidSize() returns false for non-numbers', () => {
    expect(SmartMediaProgress.isValidSize('monkey')).toBeFalsy();
  });

  /* isValidProgress */
  it('method isValidProgress() returns true for numbers equal or bigger then zero', () => {
    expect(SmartMediaProgress.isValidProgress(4444, 0)).toBeTruthy();
  });

  it('method isValidProgress() returns false when progress is bigger then size', () => {
    expect(SmartMediaProgress.isValidProgress(4444, 5555)).toBeFalsy();
  });

  it('method isValidProgress() returns false for numbers less then zero', () => {
    expect(SmartMediaProgress.isValidProgress(4444, -1)).toBeFalsy();
  });

  it('method isValidProgress() returns false for non-numbers', () => {
    expect(SmartMediaProgress.isValidProgress(4444, <any>'monkey')).toEqual(
      false,
    );
  });

  /* isValidStartTime */
  it('method isValidStartTime returns true when startTime is bigger then zero', () => {
    expect(SmartMediaProgress.isValidStartTime(1)).toBeTruthy();
  });

  it('method isValidStartTime returns false when startTime is equal or less then zero', () => {
    expect(SmartMediaProgress.isValidStartTime(0)).toBeFalsy();
  });

  it('method isValidStartTime() returns false for non-numbers', () => {
    expect(SmartMediaProgress.isValidStartTime(<any>'monkey')).toEqual(false);
  });

  /* isValidMeasureTime */
  it('method isValidMeasureTime() returns true when measureTime bigger then startTime', () => {
    expect(SmartMediaProgress.isValidMeasureTime(1000, 1001)).toBeTruthy();
  });

  it('method isValidMeasureTime() returns false when measureTime is less then startTime', () => {
    expect(SmartMediaProgress.isValidMeasureTime(1000, 999)).toBeFalsy();
  });

  it('method isValidMeasureTime() returns false for non-numbers', () => {
    expect(
      SmartMediaProgress.isValidMeasureTime(1000, <any>'monkey'),
    ).toBeFalsy();
  });
});

describe('Progress class exposed parameters', () => {
  it('include absolute progress', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.absolute).toEqual(256);
  });

  it('include portion progress', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.portion).toEqual(0.5);
  });

  it('include max progress', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.max).toEqual(512);
  });

  it('include overallTime progress', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.overallTime).toEqual(200);
  });

  it('include expectedFinishTime progress', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.expectedFinishTime).toEqual(300);
  });

  it('include timeLeft progress', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.timeLeft).toEqual(100);
  });

  it('toJSON() method returns correct object', () => {
    const p = new SmartMediaProgress(512, 256, 100, 200);
    expect(p.toJSON()).toEqual({
      absolute: 256,
      portion: 0.5,
      max: 512,
      overallTime: 200,
      expectedFinishTime: 300,
      timeLeft: 100,
    });
  });
});
