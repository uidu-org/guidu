import loadable from '@loadable/component';
import React from 'react';
import { BookOpen } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Configurator = loadable(() => import('./configurator'));

export default {
  id: 'comparator',
  name: (
    <FormattedMessage
      id="dataView.comparator.name"
      defaultMessage="Comparator"
    />
  ),
  icon: BookOpen,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dataView.comparator.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};
