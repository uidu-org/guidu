import loadable from '@loadable/component';
import React from 'react';
import { Zap } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Funnel'));

export default {
  id: 'funnel',
  name: (
    <FormattedMessage
      defaultMessage="Funnel chart"
      id="uidu.dashlets.funnel.name"
    />
  ),
  icon: Zap,
  color: '#D08770',
  description: (
    <FormattedMessage
      defaultMessage="Funnel chart."
      id="uidu.dashlets.funnel.description"
    />
  ),
  chart: Chart,
};
