import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const addressField = {
  id: 'address',
  name: <FormattedMessage id="field.address.name" defaultMessage="Address" />,
  icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
};

export default () => ({
  filter: 'agTextColumnFilter',
  type: 'address',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  },
});
