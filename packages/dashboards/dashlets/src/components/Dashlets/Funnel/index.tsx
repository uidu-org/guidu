import loadable from '@loadable/component';
import React from 'react';
import { Zap } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Funnel'));

export default {
  id: 'funnel',
  name: (
    <FormattedMessage id="dashlets.funnel.name" defaultMessage="Funnel chart" />
  ),
  icon: Zap,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dashlets.funnel.description"
      defaultMessage="Funnel chart."
    />
  ),
  chart: Chart,
};
