import moment from 'moment';
import React, { PureComponent } from 'react';

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
        <div>
          {points.slice(0, 1).map(({ payload, dataKey }) => {
            const { key: label, value } = payload;
            const cleanedDataKey = dataKey.replace('value.', '');
            return (
              <p className="mb-0" key={label}>
                <b>{formatValue(value[cleanedDataKey])}</b>
                <br />
                {labelByTimeframeGroup(label, timeframeGrouping)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  }
}
