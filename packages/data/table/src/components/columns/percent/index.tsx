import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'percent',
  filter: 'agTextColumnFilter',
  type: 'numericColumn',
  valueFormatter: ({ value }) => `${value}%`,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faPercent} /> },
});
