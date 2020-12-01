import loadable from '@loadable/component';
import React from 'react';
import { Globe } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Geo'));

export default {
  id: 'geo',
  name: <FormattedMessage defaultMessage="Geo chart" />,
  icon: Globe,
  color: '#D08770',
  description: <FormattedMessage defaultMessage="Geo chart." />,
  chart: Chart,
};
