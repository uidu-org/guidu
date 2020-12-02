import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Address: Field = {
  kind: 'address',
  name: <FormattedMessage defaultMessage="Address" />,
  icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  description: (
    <FormattedMessage defaultMessage="Allow geolocation of your records with Google Maps autocomplete help" />
  ),
  color: '#C384C5',
};

export default Address;
