import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/NumberFilterForm'),
);

const Currency: ColumnDef<unknown, number> = {
  meta: {
    kind: 'currency',
    name: (
      <FormattedMessage
        defaultMessage="Currency"
        id="uidu.data-fields.currency.name"
      />
    ),
    description: (
      <FormattedMessage
        defaultMessage="Format a number with a currency"
        id="uidu.data-fields.currency .description"
      />
    ),
    icon: <FontAwesomeIcon icon={faEuroSign} />,
    color: 'sandybrown',
  },
  cell: Cell,
  aggregate: 'sum',
  Filter,
};

export default Currency;
