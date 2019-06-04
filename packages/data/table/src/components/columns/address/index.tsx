import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  filter: 'agTextColumnFilter',
  type: 'address',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  },
});
