import Counter from './Counter';
import Funnel from './Funnel';
import Geo from './Geo';
import Pie from './Pie';
import Radar from './Radar';
import Table from './Table';
import Treemap from './Treemap';
import XY from './XY';

export { default as Counter } from './Counter';
export { default as Funnel } from './Funnel';
export { default as Geo } from './Geo';
export { default as Pie } from './Pie';
export { default as Radar } from './Radar';
export { default as Table } from './Table';
export { default as Treemap } from './Treemap';
export { default as XY } from './XY';

export const byName = {
  counter: Counter,
  funnel: Funnel,
  geo: Geo,
  pie: Pie,
  radal: Radar,
  table: Table,
  treemap: Treemap,
  xy: XY,
};

export default [Counter, Funnel, Geo, Pie, Radar, Table, Treemap, XY];
