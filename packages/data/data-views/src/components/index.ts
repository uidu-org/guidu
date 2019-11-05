import boardDataView from './board';
import calendarDataView from './calendar';
import galleryDataView from './gallery';
import mapDataView from './map';
import tableDataView from './table';
import timelineDataView from './timeline';

export { default as boardDataView } from './board';
export { default as calendarDataView } from './calendar';
export { default as galleryDataView } from './gallery';
export { default as mapDataView } from './map';
export { default as tableDataView } from './table';
export { default as timelineDataView } from './timeline';

export const byName = {
  table: tableDataView,
  map: mapDataView,
  gallery: galleryDataView,
  calendar: calendarDataView,
  board: boardDataView,
  timeline: timelineDataView,
};

export default [
  tableDataView,
  mapDataView,
  galleryDataView,
  calendarDataView,
  boardDataView,
  timelineDataView,
];
