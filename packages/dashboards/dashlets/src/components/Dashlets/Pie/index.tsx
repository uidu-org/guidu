import loadable from '@loadable/component';
import React from 'react';
import { PieChart } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Pie'));

export default {
  id: 'pie',
  name: <FormattedMessage id="dashlets.pie.name" defaultMessage="Pie chart" />,
  icon: PieChart,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dashlets.pie.description"
      defaultMessage="Pie chart."
    />
  ),
  chart: Chart,
};
