import loadable from '@loadable/component';
import React from 'react';
import { Activity } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Configurator = loadable(() => import('./configurator'));

const Gantt: DataViewKind = {
  id: 'gantt',
  name: <FormattedMessage id="dataView.gantt.name" defaultMessage="Gantt" />,
  icon: Activity,
  color: '#BF616A',
  description: (
    <FormattedMessage
      id="dataView.gantt.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};

export default Gantt;
