import loadable from '@loadable/component';
import React from 'react';
import { Sun } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Radar'));

export default {
  id: 'radar',
  name: (
    <FormattedMessage id="dashlets.radar.name" defaultMessage="Radar chart" />
  ),
  icon: Sun,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dashlets.radar.description"
      defaultMessage="Radar chart."
    />
  ),
  chart: Chart,
};
