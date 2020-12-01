import loadable from '@loadable/component';
import React from 'react';
import { List } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Table'));

export default {
  id: 'table',
  name: <FormattedMessage defaultMessage="Table" />,
  icon: List,
  color: '#D08770',
  description: <FormattedMessage defaultMessage="Table" />,
  chart: Chart,
};
