import { UIAnalyticsEvent } from '@uidu/analytics';
import React from 'react';

export type KeyboardOrMouseEvent =
  | React.MouseEvent<any>
  | React.KeyboardEvent<any>;
export type AppearanceType = 'danger' | 'warning';

export type ButtonOnClick = (
  e: React.MouseEvent<HTMLElement>,
  analyticsEvent: UIAnalyticsEvent,
) => void;
