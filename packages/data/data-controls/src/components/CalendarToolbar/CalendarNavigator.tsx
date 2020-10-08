import Tooltip from '@uidu/tooltip';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Trigger } from '../../styled';
// import { NavigatorProps } from '../types';

export default function CalendarNavigator({
  onNext = () => {},
  onPrev = () => {},
  onNavigate,
  label,
}: any) {
  return (
    <div className="d-flex align-items-center">
      <Trigger
        activeBg="#d0f0fd"
        className="btn"
        onClick={() => onNavigate('PREV')}
      >
        <ChevronLeft strokeWidth={2} size={14} />
      </Trigger>
      <Tooltip content={label} position="bottom">
        <Trigger
          activeBg="#d0f0fd"
          className="btn justify-content-center"
          style={{ width: 140 }}
        >
          <span style={{ textTransform: 'initial' }} className="text-truncate">
            {label}
          </span>
        </Trigger>
      </Tooltip>
      <Trigger
        activeBg="#d0f0fd"
        className="btn"
        onClick={() => onNavigate('NEXT')}
      >
        <ChevronRight strokeWidth={2} size={14} />
      </Trigger>
    </div>
  );
}
