import { faPhone } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Phone: ColumnDef<unknown, string> = {
  meta: {
    kind: 'phone',
    name: (
      <FormattedMessage
        defaultMessage="Phone"
        id="uidu.data-fields.phone.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faPhone} />,
    color: '#CB732B',
    description: (
      <FormattedMessage
        defaultMessage="A telephone number (e.g. (415) 555-9876)."
        id="uidu.data-fields.phone.description"
      />
    ),
  },
  cell: Cell,
  Filter,
};

export default Phone;
