import Tooltip from '@uidu/tooltip';
import React, { Component } from 'react';
import { Star } from 'react-feather';

export default class Reply extends Component<any> {
  render() {
    return (
      <Tooltip
        placement="top"
        content="Star"
        delay={0}
        tag="button"
        className="btn btn-sm bg-white border py-1 px-3 d-flex align-items-center"
      >
        <Star size={16} />
      </Tooltip>
    );
  }
}
