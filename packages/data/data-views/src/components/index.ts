import boardDataView from './board';
import calendarDataView from './calendar';
import comparatorDataView from './comparator';
import galleryDataView from './gallery';
import mapDataView from './map';
import tableDataView from './table';
import timelineDataView from './timeline';

export { default as boardDataView } from './board';
export { default as calendarDataView } from './calendar';
export { default as comparatorDataView } from './comparator';
export { default as galleryDataView } from './gallery';
export { default as mapDataView } from './map';
export { default as tableDataView } from './table';
export { default as timelineDataView } from './timeline';

export const byName = {
  board: boardDataView,
  calendar: calendarDataView,
  comparator: comparatorDataView,
  gallery: galleryDataView,
  map: mapDataView,
  table: tableDataView,
  timeline: timelineDataView,
};

export default [
  boardDataView,
  calendarDataView,
  comparatorDataView,
  galleryDataView,
  mapDataView,
  tableDataView,
  timelineDataView,
];
