import boardDataView from './board';
import calendarDataView from './calendar';
import comparatorDataView from './comparator';
import galleryDataView from './gallery';
import ganttDataView from './gantt';
import listDataView from './list';
import schedulerDataView from './scheduler';
import tableDataView from './table';
import timelineDataView from './timeline';

export { default as boardDataView } from './board';
export { default as calendarDataView } from './calendar';
export { default as comparatorDataView } from './comparator';
export { default as galleryDataView } from './gallery';
export { default as ganttDataView } from './gantt';
export { default as listDataView } from './list';
export { default as schedulerDataView } from './scheduler';
export { default as tableDataView } from './table';
export { default as timelineDataView } from './timeline';

export const byName = {
  board: boardDataView,
  calendar: calendarDataView,
  comparator: comparatorDataView,
  gallery: galleryDataView,
  gantt: ganttDataView,
  list: listDataView,
  scheduler: schedulerDataView,
  table: tableDataView,
  timeline: timelineDataView,
};

export default [
  boardDataView,
  calendarDataView,
  comparatorDataView,
  galleryDataView,
  ganttDataView,
  listDataView,
  schedulerDataView,
  tableDataView,
  timelineDataView,
];
