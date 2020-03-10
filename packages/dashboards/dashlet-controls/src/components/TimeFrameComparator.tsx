import { FieldDateRangeStateless } from '@uidu/field-date-range';
import React, { PureComponent } from 'react';

export default class TimeFrameComparator extends PureComponent<any> {
  render() {
    const { handleDateChange, from, to } = this.props;

    return (
      <div className="d-flex align-items-center ml-2">
        <span className="text-muted small mx-2">vs.</span>
        <FieldDateRangeStateless
          from={from.toDate()}
          to={to.toDate()}
          onChange={handleDateChange}
          displayFormat="DD/MM/YY"
        />
      </div>
    );
  }
}
