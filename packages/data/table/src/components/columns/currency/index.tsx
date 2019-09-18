import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: ['numericColumn', 'currency'],
  filter: 'agNumberColumnFilter',
  valueFormatter: ({ value }) => value,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faEuroSign} /> },
});
