import moment from 'moment';
import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import { TimeFrame, TimeFrameComparator, TimeFrameGrouper } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div className="d-flex align-items-center p-3">
        <TimeFrame
          activeTimeFrame="1Y"
          onChange={console.log}
          from={moment()}
          to={moment()}
        />
        <TimeFrameComparator />
        <TimeFrameGrouper activeGrouper="month" />
      </div>
    );
  }
}
