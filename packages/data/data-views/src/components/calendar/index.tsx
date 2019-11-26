import loadable from '@loadable/component';
import React from 'react';
import { Calendar } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Configurator = loadable(() => import('./configurator'));

export default {
  id: 'calendar',
  name: (
    <FormattedMessage id="dataView.calendar.name" defaultMessage="Calendar" />
  ),
  icon: Calendar,
  color: '#A3BE8C',
  description: (
    <FormattedMessage
      id="dataView.calendar.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};
