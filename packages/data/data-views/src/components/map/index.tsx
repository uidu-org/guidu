import loadable from '@loadable/component';
import React from 'react';
import { MapPin } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Configurator = loadable(() => import('./configurator'));

export default {
  id: 'map',
  name: <FormattedMessage id="dataView.map.name" defaultMessage="Map" />,
  icon: MapPin,
  color: '#34ae65',
  description: (
    <FormattedMessage
      id="dataView.map.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};
