import { timeDay, timeMonth, timeWeek, timeYear } from 'd3-time';
import moment from 'moment';

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
    case '4W':
      range.from = moment()
        .subtract(4, 'week')
        .startOf('day');
      break;
    case '1Y':
      range.from = moment()
        .subtract(1, 'year')
        .startOf('day');
      break;
    case 'MTD':
      range.from = moment().startOf('month');
      break;
    case 'QTD':
      range.from = moment().startOf('quarter');
      break;
    case 'YTD':
      range.from = moment().startOf('year');
      break;
    default:
      range.from = moment()
        .subtract(5, 'year')
        .startOf('day');
  }
  return range;
};

export const groupByTimeframe = (
  timeframe,
  timeframeGrouping,
  list,
  key = 'createdAt',
) => {
  const { from, to } =
    typeof timeframe === 'string'
      ? convertTimeframeToRange(timeframe)
      : timeframe;
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

  const data = Object.keys(list).reduce((acc, namespace) => {
    acc[namespace] = list[namespace].filter(
      l =>
        moment(l[key])
          .startOf(timeframeGrouping)
          .diff(moment(startDate)) >= 0 &&
        moment(endDate).diff(moment(l[key]).startOf(timeframeGrouping)) >= 0,
    );
    return acc;
  }, {});

  return {
    comparator: {},
    range,
    data,
  };
};
