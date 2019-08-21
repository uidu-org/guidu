let hasRequiredPerformanceAPIs: boolean | undefined;

export function isPerformanceAPIAvailable(): boolean {
  if (hasRequiredPerformanceAPIs === undefined) {
    hasRequiredPerformanceAPIs =
      typeof window !== 'undefined' &&
      'performance' in window &&
      [
        'measure',
        'clearMeasures',
        'clearMarks',
        'getEntriesByName',
        'getEntriesByType',
        'now',
      ].every(api => !!(performance as any)[api]);
  }

  return hasRequiredPerformanceAPIs;
}
