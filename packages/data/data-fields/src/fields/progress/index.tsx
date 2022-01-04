import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Progress: Field = {
  kind: 'progress',
  name: (
    <FormattedMessage
      defaultMessage="Progress"
      id="uidu.data-fields.progress.name"
    />
  ),
  description: (
    <FormattedMessage
      defaultMessage="Show a progress bar with progress value"
      id="uidu.data-fields.progress.description"
    />
  ),
  icon: <FontAwesomeIcon icon={faTasks} />,
  color: 'darkseagreen',
  Cell,
  mocks,
};

export default Progress;
