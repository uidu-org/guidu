import loadable from '@loadable/component';
import React from 'react';
import { BookOpen } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Configurator = loadable(() => import('./configurator'));

const Timeline: DataViewKind = {
  id: 'timeline',
  name: (
    <FormattedMessage
      defaultMessage="Timeline"
      id="uidu.data-views.timeline.name"
    />
  ),
  icon: BookOpen,
  color: '#BF616A',
  description: (
    <FormattedMessage
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
      id="uidu.data-views.timeline.description"
    />
  ),
};

export default Timeline;
