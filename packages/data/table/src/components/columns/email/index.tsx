import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'email',
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faFont} /> },
});
