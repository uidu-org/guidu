import loadable from '@loadable/component';
import React from 'react';
import { Hash } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Counter'));

export default {
  id: 'counter',
  name: (
    <FormattedMessage id="dashlets.counter.name" defaultMessage="Counter" />
  ),
  icon: Hash,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dashlets.counter.description"
      defaultMessage="Counter"
    />
  ),
  chart: Chart,
};
