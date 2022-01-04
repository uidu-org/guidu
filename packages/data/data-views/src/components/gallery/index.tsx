import loadable from '@loadable/component';
import React from 'react';
import { Grid } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Controls = loadable(() => import('./controls'));

const Gallery: DataViewKind = {
  id: 'gallery',
  name: (
    <FormattedMessage
      defaultMessage="Gallery"
      id="uidu.data-views.gallery.name"
    />
  ),
  icon: Grid,
  color: '#EBCB8B',
  description: (
    <FormattedMessage
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
      id="uidu.data-views.gallery.description"
    />
  ),
  controls: Controls,
};

export default Gallery;
