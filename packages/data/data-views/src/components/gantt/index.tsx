import loadable from '@loadable/component';
import React from 'react';
import { Activity } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Configurator = loadable(() => import('./configurator'));

const Gantt: DataViewKind = {
  id: 'gantt',
  name: (
    <FormattedMessage defaultMessage="Gantt" id="uidu.data-views.gantt.name" />
  ),
  icon: Activity,
  color: '#BF616A',
  description: (
    <FormattedMessage
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
      id="uidu.data-views.gantt.description"
    />
  ),
  configurator: Configurator,
};

export default Gantt;
