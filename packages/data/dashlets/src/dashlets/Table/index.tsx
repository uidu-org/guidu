import React from 'react';
import { List } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import Chart from './Table';
import ChartStateless from './TableStateless';

export default {
  id: 'table',
  name: (
    <FormattedMessage defaultMessage="Table" id="uidu.dashlets.table.name" />
  ),
  icon: List,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="Table"
      id="uidu.dashlets.table.description"
    />
  ),
  chart: Chart,
  chartStateless: ChartStateless,
  Chart,
  ChartStateless,
};
