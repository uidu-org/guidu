import React from 'react';
import { PieChart } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import Chart from './Pie';
import ChartStateless from './PieStateless';

export default {
  id: 'pie',
  name: (
    <FormattedMessage defaultMessage="Pie chart" id="uidu.dashlets.pie.name" />
  ),
  icon: PieChart,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="Pie chart."
      id="uidu.dashlets.pie.description"
    />
  ),
  chart: Chart,
  chartStateless: ChartStateless,
  Chart,
  ChartStateless,
};
