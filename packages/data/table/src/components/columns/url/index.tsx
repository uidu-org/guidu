import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'url',
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
  },
});
