import loadable from '@loadable/component';
import React from 'react';
import { Sun } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Radar'));

export default {
  id: 'radar',
  name: (
    <FormattedMessage
      defaultMessage="Radar chart"
      id="uidu.dashlets.radar.name"
    />
  ),
  icon: Sun,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="Radar chart."
      id="uidu.dashlets.radar.description"
    />
  ),
  chart: Chart,
};
