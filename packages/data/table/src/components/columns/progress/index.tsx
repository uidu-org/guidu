import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Renderer from './renderer';

export const progressField = {
  id: 'progress',
  name: <FormattedMessage id="field.progress.name" defaultMessage="Progress" />,
  icon: <FontAwesomeIcon icon={faTasks} />,
};

export default () => ({
  type: 'progress',
  field: 'progress',
  filter: 'agNumberColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faTasks} /> },
});
