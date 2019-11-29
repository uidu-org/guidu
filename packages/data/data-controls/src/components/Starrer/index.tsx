import React, { Component } from 'react';
import { Star } from 'react-feather';
import { Trigger } from '../../styled';

export default class Starrer extends Component<any> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onChange } = this.props;
    return (
      <Trigger activeBg="#fee2d5" className="btn" active={false}>
        <Star strokeWidth={2} size={14} />
      </Trigger>
    );
  }
}
