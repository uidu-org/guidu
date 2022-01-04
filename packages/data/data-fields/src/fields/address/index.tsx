import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Address: Field = {
  kind: 'address',
  name: (
    <FormattedMessage
      defaultMessage="Address"
      id="uidu.data-fields.address.name"
    />
  ),
  icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  description: (
    <FormattedMessage
      defaultMessage="Allow geolocation of your records with Google Maps autocomplete help"
      id="uidu.data-fields.address.description"
    />
  ),
  color: '#C384C5',
  Cell,
  mocks,
};

export default Address;
