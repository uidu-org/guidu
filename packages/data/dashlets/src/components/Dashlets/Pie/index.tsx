import loadable from '@loadable/component';
import React from 'react';
import { PieChart } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Pie'));
const ChartStateless = loadable(() => import('./PieStateless'));

export default {
  id: 'pie',
  name: <FormattedMessage defaultMessage="Pie chart" />,
  icon: PieChart,
  color: '#D08770',
  description: <FormattedMessage defaultMessage="Pie chart." />,
  chart: Chart,
  chartStateless: ChartStateless,
};
