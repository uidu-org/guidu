import Counter from './Dashlets/Counter';
import Funnel from './Dashlets/Funnel';
import Geo from './Dashlets/Geo';
import Pie from './Dashlets/Pie';
import Radar from './Dashlets/Radar';
import Table from './Dashlets/Table';
import Treemap from './Dashlets/Treemap';
import XY from './Dashlets/XY';

export { default as Counter } from './Dashlets/Counter';
export { default as Funnel } from './Dashlets/Funnel';
export { default as Geo } from './Dashlets/Geo';
export { default as Pie } from './Dashlets/Pie';
export { default as Radar } from './Dashlets/Radar';
export { default as Table } from './Dashlets/Table';
export { default as Treemap } from './Dashlets/Treemap';
export { default as XY } from './Dashlets/XY';

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
