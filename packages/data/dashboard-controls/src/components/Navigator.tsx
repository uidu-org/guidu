import React, { Component } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'react-feather';
import { Trigger } from '../styled';
import { NavigatorProps } from '../types';

export default class Navigator extends Component<NavigatorProps> {
  static defaultProps = {
    label: 'Current period',
    onPrev: () => {},
    onNext: () => {},
  };

  render() {
    const { onNext, onPrev, label } = this.props;

    return (
      <div tw="flex items-center">
        <Trigger
          activeBg="#d0f0fd"
          onClick={onPrev}
          iconBefore={<ChevronLeft strokeWidth={2} size={14} />}
        />
        <Trigger
          activeBg="#d0f0fd"
          iconBefore={<Calendar strokeWidth={2} size={14} className="mr-2" />}
        >
          {label}
        </Trigger>
        <Trigger
          activeBg="#d0f0fd"
          onClick={onNext}
          iconBefore={<ChevronRight strokeWidth={2} size={14} />}
        />
      </div>
    );
  }
}
