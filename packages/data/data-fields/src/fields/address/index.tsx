import { faMapMarkerAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Address: ColumnDef<unknown> = {
  meta: {
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
  },
  cell: Cell,
  mocks,
};

export default Address;
