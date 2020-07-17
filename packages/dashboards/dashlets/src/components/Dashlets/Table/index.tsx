import loadable from '@loadable/component';
import React from 'react';
import { List } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Chart = loadable(() => import('./Table'));

export default {
  id: 'table',
  name: <FormattedMessage id="dashlets.list.name" defaultMessage="Table" />,
  icon: List,
  color: '#D08770',
  description: (
    <FormattedMessage id="dashlets.list.description" defaultMessage="Table" />
  ),
  chart: Chart,
};
