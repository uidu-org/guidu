import loadable from '@loadable/component';
import React from 'react';
import { Database } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Treemap'));

export default {
  id: 'treemap',
  name: (
    <FormattedMessage
      id="uidu.dashlets.treemap.name"
      defaultMessage="Treemap chart"
    />
  ),
  icon: Database,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="uidu.dashlets.treemap.description"
      defaultMessage="Treemap chart."
    />
  ),
  chart: Chart,
};
