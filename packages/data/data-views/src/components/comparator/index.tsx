import loadable from '@loadable/component';
import React from 'react';
import { Shuffle } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Configurator = loadable(() => import('./configurator'));

const Comparator: DataViewKind = {
  id: 'comparator',
  name: (
    <FormattedMessage
      id="uidu.data-views.comparator.name"
      defaultMessage="Comparator"
    />
  ),
  icon: Shuffle,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="uidu.data-views.comparator.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};

export default Comparator;
