import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'cover',
  sortable: false,
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faImage} />,
  },
});
