import { nest } from 'd3-collection';
import moment from 'moment';

export const groupByDay = (list, rollup) =>
  nest()
    .key(d =>
      moment(d.createdAt)
        .startOf('day')
        .format('L'),
    )
    .rollup(rollup)
    .entries(list);
