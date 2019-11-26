import loadable from '@loadable/component';
import React from 'react';
import { Activity } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Configurator = loadable(() => import('./configurator'));

export default {
  id: 'timeline',
  name: (
    <FormattedMessage id="dataView.timeline.name" defaultMessage="Timeline" />
  ),
  icon: Activity,
  color: '#BF616A',
  description: (
    <FormattedMessage
      id="dataView.timeline.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};
