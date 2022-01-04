import loadable from '@loadable/component';
import React from 'react';
import { Calendar } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Controls = loadable(() => import('./controls'));

const CalendarView: DataViewKind = {
  id: 'calendar',
  name: (
    <FormattedMessage
      defaultMessage="Calendar"
      id="uidu.data-views.calendar.name"
    />
  ),
  icon: Calendar,
  color: '#A3BE8C',
  description: (
    <FormattedMessage
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
      id="uidu.data-views.calendar.description"
    />
  ),

  controls: Controls,
};

export default CalendarView;
