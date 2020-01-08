import moment from 'moment';
import React, { PureComponent } from 'react';

export const labelByTimeframeGroup = (label, timeframeGrouping) => {
  switch (timeframeGrouping) {
    case 'week':
      return `${moment(label).format('DD MMM')} - ${moment(label)
        .add(1, 'weeks')
        .format('DD MMM')}`;
    case 'month':
      return moment(label).format("MMM 'YY");
    case 'year':
      return moment(label).format('YYYY');
    default:
      return moment(label).format('L');
  }
};

export default class Tooltip extends PureComponent<any> {
  render() {
    const {
      active,
      formatValue,
      timeframeGrouping,
      payload: points,
    } = this.props;
    if (active) {
      return (
        <div className="card">
          {points
            .reverse()
            .slice(0, 1)
            .map(({ payload, dataKey }) => {
              const { key: label, value } = payload;
              const cleanedDataKey = dataKey.replace('value.', '');
              return (
                <div
                  className="bg-light d-flex justify-content-between small p-2"
                  key={label}
                >
                  {labelByTimeframeGroup(label, timeframeGrouping)}
                  <b className="ml-5">{formatValue(value[cleanedDataKey])}</b>
                </div>
              );
            })}
          {points.length > 1 &&
            points.slice(1, points.length).map(({ payload, dataKey }) => {
              const { previousKey: label, previousValue } = payload;
              const cleanedDataKey = dataKey.replace('previousValue.', '');
              return (
                <div
                  className="d-flex justify-content-between small p-2"
                  key={label}
                >
                  {labelByTimeframeGroup(label, timeframeGrouping)}
                  <b className="ml-5">
                    {formatValue(previousValue[cleanedDataKey])}
                  </b>
                </div>
              );
            })}
        </div>
      );
    }
    return null;
  }
}
