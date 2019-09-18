import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  filter: 'agNumberColumnFilter',
  type: ['numericColumn', 'percent'],
  valueFormatter: ({ value }) => `${value}%`,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faPercent} /> },
});
