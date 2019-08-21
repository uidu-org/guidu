import { isPerformanceAPIAvailable } from './is-performance-api-available';

const measureMap = new Map<string, number>();

export function startMeasure(measureName: string) {
  if (!isPerformanceAPIAvailable()) {
    return;
  }
  performance.mark(measureName);
  measureMap.set(measureName, performance.now());
}

export function stopMeasure(
  measureName: string,
  onMeasureComplete: (duration: number, startTime: number) => void,
) {
  if (!isPerformanceAPIAvailable()) {
    return;
  }

  const start = measureMap.get(measureName);
  try {
    performance.measure(measureName, measureName);
    const entry = performance.getEntriesByName(measureName).pop();
    if (entry) {
      onMeasureComplete(entry.duration, entry.startTime);
    } else if (start) {
      onMeasureComplete(performance.now() - start, start);
    }
  } catch (error) {
    if (start) {
      onMeasureComplete(performance.now() - start, start);
    }
  }

  clearMeasure(measureName);
}

export function clearMeasure(measureName: string) {
  if (!isPerformanceAPIAvailable()) {
    return;
  }

  measureMap.delete(measureName);
  performance.clearMarks(measureName);
  performance.clearMeasures(measureName);
}
