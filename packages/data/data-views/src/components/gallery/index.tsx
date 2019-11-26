import loadable from '@loadable/component';
import React from 'react';
import { Grid } from 'react-feather';
import { FormattedMessage } from 'react-intl';

const Configurator = loadable(() => import('./configurator'));

export default {
  id: 'gallery',
  name: (
    <FormattedMessage id="dataView.gallery.name" defaultMessage="Gallery" />
  ),
  icon: Grid,
  color: '#EBCB8B',
  description: (
    <FormattedMessage
      id="dataView.gallery.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
  configurator: Configurator,
};
