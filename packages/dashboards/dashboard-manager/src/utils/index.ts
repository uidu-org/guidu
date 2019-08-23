import {
  Groupers,
  GroupersKeys,
  TimeFrameKeys,
} from '@uidu/dashboard-controls';
import { timeDay, timeMonth, timeWeek, timeYear } from 'd3-time';
import moment from 'moment';

export const convertTimeframeToRange = (timeframe: TimeFrameKeys) => {
  const range = {
    to: moment().startOf('day'),
    from: null,
  };
  const previousRange = {
    to: moment().startOf('day'),
    from: null,
  };
  switch (timeframe) {
    case '1W':
      range.from = previousRange.to = moment()
        .subtract(1, 'week')
        .startOf('day');
      previousRange.from = moment()
        .subtract(2, 'weeks')
        .startOf('day');
      break;
    case '4W':
      range.from = previousRange.to = moment()
        .subtract(4, 'week')
        .startOf('day');
      previousRange.from = moment()
        .subtract(8, 'weeks')
        .startOf('day');
      break;
    case '1Y':
      range.from = previousRange.to = moment()
        .subtract(1, 'year')
        .startOf('day');
      previousRange.from = moment()
        .subtract(2, 'year')
        .startOf('day');
      break;
    case 'MTD':
      range.from = moment().startOf('month');
      previousRange.from = moment()
        .subtract(1, 'month')
        .startOf('month');
      previousRange.to = moment().subtract(1, 'month');
      break;
    case 'QTD':
      range.from = moment().startOf('quarter');
      previousRange.from = moment()
        .subtract(1, 'quarter')
        .startOf('quarter');
      previousRange.to = moment().subtract(1, 'quarter');
      break;
    case 'YTD':
      range.from = moment().startOf('year');
      previousRange.from = moment()
        .subtract(1, 'year')
        .startOf('year');
      previousRange.to = moment().subtract(1, 'year');
      break;
    default:
      range.from = moment()
        .subtract(5, 'year')
        .startOf('day');
  }
  return {
    range,
    previousRange,
  };
};

export const groupByTimeframe = (
  timeframe,
  timeframeGrouping: GroupersKeys,
  list,
  key = 'createdAt',
) => {
  const {
    range: { from, to },
    previousRange: { from: previousFrom, to: previousTo },
  } =
    typeof timeframe === 'string'
      ? convertTimeframeToRange(timeframe as TimeFrameKeys)
      : timeframe;
  const startDate = moment(from).startOf(timeframeGrouping);
  const endDate = moment(to).endOf(timeframeGrouping);

  const previousStartDate = moment(previousFrom).startOf(timeframeGrouping);
  const previousEndDate = moment(previousTo).endOf(timeframeGrouping);

  let range = null;
  let previousRange = null;
  switch (timeframeGrouping) {
    case 'day':
      range = timeDay.range(startDate.toDate(), endDate.toDate());
      previousRange = timeDay.range(
        previousStartDate.toDate(),
        previousEndDate.toDate(),
      );
      break;
    case 'week':
      range = timeWeek.range(startDate.toDate(), endDate.toDate());
      previousRange = timeWeek.range(
        previousStartDate.toDate(),
        previousEndDate.toDate(),
      );
      break;
    case 'month':
      range = timeMonth.range(startDate.toDate(), endDate.toDate());
      previousRange = timeMonth.range(
        previousStartDate.toDate(),
        previousEndDate.toDate(),
      );
      break;
    default:
      range = timeYear.range(startDate.toDate(), endDate.toDate());
      previousRange = timeYear.range(
        previousStartDate.toDate(),
        previousEndDate.toDate(),
      );
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

  const comparatorData = Object.keys(list).reduce((acc, namespace) => {
    acc[namespace] = list[namespace].filter(
      l =>
        moment(l[key])
          .startOf(timeframeGrouping)
          .diff(moment(previousStartDate)) >= 0 &&
        moment(previousEndDate).diff(
          moment(l[key]).startOf(timeframeGrouping),
        ) >= 0,
    );
    return acc;
  }, {});

  return {
    comparatorData,
    comparatorRange: previousRange,
    range,
    data,
  };
};

export const groupersByTimeframe = (
  defaultGroupers: Array<Groupers>,
  timeframe: TimeFrameKeys,
) => {
  switch (timeframe) {
    case '1W':
      return defaultGroupers.slice(0, 1);
    case '4W':
      return defaultGroupers.slice(0, 2);
    case '1Y':
      return defaultGroupers.slice(1, 3);
    case 'MTD':
      return defaultGroupers.slice(0, 2);
    case 'QTD':
      return defaultGroupers.slice(0, 2);
    case 'YTD':
      return defaultGroupers.slice(1, 3);
    default:
      return defaultGroupers.slice(2, 4);
  }
};
