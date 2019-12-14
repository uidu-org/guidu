import loadable from '@loadable/component';
import React from 'react';
import { Clock } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Configurator = loadable(() => import('./configurator'));

export default {
  id: 'scheduler',
  name: (
    <FormattedMessage id="dataView.scheduler.name" defaultMessage="Scheduler" />
  ),
  icon: Clock,
  color: '#BF616A',
  description: (
    <FormattedMessage
      id="dataView.scheduler.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};
