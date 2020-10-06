import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Address: Field = {
  kind: 'address',
  name: <FormattedMessage id="field.address.name" defaultMessage="Address" />,
  icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  description: (
    <FormattedMessage
      id="field.address.description"
      defaultMessage="Allow geolocation of your records with Google Maps autocomplete help"
    />
  ),
  filter: 'agTextColumnFilter',
  viewType: 'address',
};

export default Address;
