import loadable from '@loadable/component';
import React from 'react';
import { Globe } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Geo'));

export default {
  id: 'geo',
  name: <FormattedMessage id="dashlets.geo.name" defaultMessage="Geo chart" />,
  icon: Globe,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dashlets.geo.description"
      defaultMessage="Geo chart."
    />
  ),
  chart: Chart,
};
