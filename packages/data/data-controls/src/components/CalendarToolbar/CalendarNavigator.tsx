import React, { Component } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'react-feather';
import { Trigger } from '../../styled';
// import { NavigatorProps } from '../types';

export default class CalendarNavigator extends Component<any> {
  static defaultProps = {
    label: 'Current period',
    onPrev: () => {},
    onNext: () => {},
  };

  render() {
    const { onNext, onPrev, label } = this.props;
    console.log(this.props);

    return (
      <div className="d-flex align-items-center">
        <Trigger
          activeBg="#d0f0fd"
          className="btn"
          onClick={() => this.props.onNavigate('PREV')}
        >
          <ChevronLeft strokeWidth={2} size={14} />
        </Trigger>
        <Trigger activeBg="#d0f0fd" className="btn">
          <Calendar strokeWidth={2} size={14} className="mr-2" />
          <span style={{ textTransform: 'initial' }}>{label}</span>
        </Trigger>
        <Trigger
          activeBg="#d0f0fd"
          className="btn"
          onClick={() => this.props.onNavigate('NEXT')}
        >
          <ChevronRight strokeWidth={2} size={14} />
        </Trigger>
      </div>
    );
  }
}
