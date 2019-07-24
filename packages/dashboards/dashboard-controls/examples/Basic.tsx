import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import { TimeFrame, TimeFrameComparator, TimeFrameGrouper } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div className="d-flex align-items-center p-3">
        <TimeFrame onChange={console.log} />
        <TimeFrameComparator />
        <TimeFrameGrouper />
        {/* <TimeFrameCustom /> */}
      </div>
    );
  }
}
