import loadable from '@loadable/component';
import React from 'react';
import { Hash } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Counter'));
const ChartStateless = loadable(() => import('./CounterStateless'));

export default {
  id: 'counter',
  name: (
    <FormattedMessage
      defaultMessage="Counter"
      id="uidu.dashlets.counter.name"
    />
  ),
  icon: Hash,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="Counter"
      id="uidu.dashlets.counter.description"
    />
  ),
  chart: Chart,
  chartStateless: ChartStateless,
};
