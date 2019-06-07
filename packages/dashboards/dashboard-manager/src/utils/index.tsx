import { nest } from 'd3-collection';
import { timeDay, timeMonth, timeWeek, timeYear } from 'd3-time';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import React from 'react';

export const cleanTimeSeriesList = list => list.filter(l => !l.fake);

export const convertTimeframeToRange = timeframe => {
  const range = {
    to: moment().startOf('day'),
    from: null,
  };
  switch (timeframe) {
    case '1W':
      range.from = moment()
        .subtract(1, 'week')
        .startOf('day');
      break;
    case '2W':
      range.from = moment()
        .subtract(2, 'week')
        .startOf('day');
      break;
    case '1M':
      range.from = moment()
        .subtract(1, 'month')
        .startOf('day');
      break;
    case '3M':
      range.from = moment()
        .subtract(3, 'month')
        .startOf('day');
      break;
    case '1Y':
      range.from = moment()
        .subtract(1, 'year')
        .startOf('day');
      break;
    default:
      range.from = moment()
        .subtract(5, 'year')
        .startOf('day');
  }
  return range;
};

export const labelByTimeframeGroup = (label, timeframeGrouping) => {
  switch (timeframeGrouping) {
    case 'week':
      return (
        <span>
          {moment(label).format('L')}
          <span>
            {' '}
            -{' '}
            {moment(label)
              .add(1, 'weeks')
              .format('L')}
          </span>
        </span>
      );
    case 'month':
      return moment(label).format("MMMM 'YY");
    case 'year':
      return moment(label).format('YYYY');
    default:
      return moment(label).format('L');
  }
};

export const groupByTimeframe = (
  from,
  to,
  timeframeGrouping,
  list,
  rollup,
  key = 'createdAt',
) => {
  const startDate = moment(from).startOf(timeframeGrouping);
  const endDate = moment(to).endOf(timeframeGrouping);
  let range = null;
  switch (timeframeGrouping) {
    case 'day':
      range = timeDay.range(startDate.toDate(), endDate.toDate());
      break;
    case 'week':
      // const startDate = new Date(2015, 0, 1)
      range = timeWeek.range(startDate.toDate(), endDate.toDate());
      break;
    case 'month':
      // const startDate = new Date(2015, 0, 1)
      range = timeMonth.range(startDate.toDate(), endDate.toDate());
      break;
    default:
      range = timeYear.range(startDate.toDate(), endDate.toDate());
      break;
  }
  const data = list.filter(
    l =>
      moment(l[key])
        .startOf(timeframeGrouping)
        .diff(moment(startDate)) >= 0 &&
      moment(endDate).diff(moment(l[key]).startOf(timeframeGrouping)) >= 0,
  );

  const listWithKeys = orderBy(
    [
      ...range.map(l => ({
        fake: true,
        [key]: moment(l)
          .startOf(timeframeGrouping)
          // .utc()
          .format(),
      })),
      ...data,
    ],
    key,
    'asc',
  );

  return {
    timeline: nest()
      .key(d =>
        moment(d[key])
          .startOf(timeframeGrouping)
          .format(),
      )
      .rollup(rollup)
      .entries(listWithKeys),
    data,
  };
};
