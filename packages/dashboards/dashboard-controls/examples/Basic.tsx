import React, { Component } from 'react';
import { TimeFrame, TimeFrameComparator, TimeFrameGrouper } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div className="d-flex align-items-center p-3">
        <TimeFrame />
        <TimeFrameComparator />
        <TimeFrameGrouper />
        {/* <TimeFrameCustom /> */}
      </div>
    );
  }
}
