// TODO these classes are deprecated and will be removed as part of MSW-691
import { handleError } from '../util/handleError';

export interface MediaProgress {
  absolute: number;
  portion: number;
  max: number;
  overallTime: number;
  expectedFinishTime: number;
  timeLeft: number;
}

export class SmartMediaProgress {
  constructor(
    private size: number,
    private progress: number,
    private startTime: number,
    private measureTime: number,
  ) {
    if (!SmartMediaProgress.isValidSize(size)) {
      handleError('wrong_file_size', 'Passed file size is incorrect.');
      return;
    }

    if (!SmartMediaProgress.isValidProgress(size, progress)) {
      handleError('wrong_progress', 'The progress format is incorrect.');
      return;
    }

    if (!SmartMediaProgress.isValidStartTime(startTime)) {
      handleError(
        'wrong_start_time',
        'The progress start time has incorrect format.',
      );
      return;
    }

    if (!SmartMediaProgress.isValidMeasureTime(startTime, measureTime)) {
      handleError(
        'wrong_measure_time',
        'The progress measure time has incorrect format.',
      );
      return;
    }

    this.size = size;
    this.progress = progress;
    this.startTime = startTime;
    this.measureTime = measureTime;
  }

  get absolute(): number {
    return this.progress;
  }

  get portion(): number {
    return this.progress / this.size;
  }

  get max(): number {
    return this.size;
  }

  get overallTime(): number {
    return (this.measureTime - this.startTime) / this.portion;
  }

  get expectedFinishTime(): number {
    return this.startTime + this.overallTime;
  }

  get timeLeft(): number {
    return this.expectedFinishTime - this.measureTime;
  }

  public toJSON(): MediaProgress {
    return {
      absolute: this.absolute,
      portion: this.portion,
      max: this.max,
      overallTime: this.overallTime,
      expectedFinishTime: this.expectedFinishTime,
      timeLeft: this.timeLeft,
    };
  }

  static isValidSize(size: any): boolean {
    return typeof size === 'number' && size > 0;
  }

  static isValidProgress(size: number, progress: number): boolean {
    return (
      SmartMediaProgress.isValidSize(size) &&
      typeof progress === 'number' &&
      progress >= 0 &&
      progress <= size
    );
  }

  static isValidStartTime(startTime: number): boolean {
    return typeof startTime === 'number' && startTime > 0;
  }

  static isValidMeasureTime(startTime: number, measureTime: number): boolean {
    return (
      SmartMediaProgress.isValidStartTime(startTime) &&
      typeof measureTime === 'number' &&
      measureTime >= startTime
    );
  }
}
