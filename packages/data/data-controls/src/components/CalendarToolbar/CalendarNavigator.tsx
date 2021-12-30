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
    <div tw="flex items-center">
      <Trigger
        activeBg="#d0f0fd"
        onClick={() => onNavigate('PREV')}
        iconBefore={<ChevronLeft strokeWidth={2} size={14} />}
      />
      <Tooltip content={label} position="bottom">
        <Trigger activeBg="#d0f0fd" style={{ width: 140 }}>
          <span tw="truncate">{label}</span>
        </Trigger>
      </Tooltip>
      <Trigger
        activeBg="#d0f0fd"
        className="btn"
        onClick={() => onNavigate('NEXT')}
        iconBefore={<ChevronRight strokeWidth={2} size={14} />}
      />
    </div>
  );
}
