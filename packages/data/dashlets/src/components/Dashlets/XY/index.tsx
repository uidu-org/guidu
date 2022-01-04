import loadable from '@loadable/component';
import React from 'react';
import { BarChart2 } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./XY'));
const StatelessChart = loadable(() => import('./XYStateless'));

export default {
  id: 'xy',
  name: (
    <FormattedMessage defaultMessage="XY chart" id="uidu.dashlets.xy.name" />
  ),
  icon: BarChart2,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="XY chart."
      id="uidu.dashlets.xy.description"
    />
  ),
  chart: Chart,
  chartStateless: StatelessChart,
};
