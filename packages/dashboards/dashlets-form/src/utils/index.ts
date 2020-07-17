export function chartTypeToDashletKinds(chartType: string) {
  switch (chartType) {
    case 'table':
      return ['Table', 'Pie', 'Radar'];
    case 'line':
    case 'bar':
    case 'area':
      return ['XY'];
  }
}
