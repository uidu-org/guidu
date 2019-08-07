import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'avatar',
  sortable: false,
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faUserCircle} />,
  },
});
