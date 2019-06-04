import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'currency',
  filter: 'agTextColumnFilter',
  type: 'numericColumn',
  valueFormatter: ({ value }) => `€ ${value}`,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faEuroSign} /> },
});
