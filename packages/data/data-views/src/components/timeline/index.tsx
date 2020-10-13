import loadable from '@loadable/component';
import React from 'react';
import { BookOpen } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Configurator = loadable(() => import('./configurator'));

const Timeline: DataViewKind = {
  id: 'timeline',
  name: (
    <FormattedMessage id="dataView.timeline.name" defaultMessage="Timeline" />
  ),
  icon: BookOpen,
  color: '#BF616A',
  description: (
    <FormattedMessage
      id="dataView.timeline.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
};

export default Timeline;
