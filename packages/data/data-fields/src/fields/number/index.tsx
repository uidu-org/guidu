import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Filter = loadable(
  () => import('../../components/filters/NumberFilterForm'),
);

const Number: ColumnDef<unknown, number> = {
  meta: {
    kind: 'number',
    name: (
      <FormattedMessage
        defaultMessage="Number"
        id="uidu.data-fields.number.name"
      />
    ),
    description: (
      <FormattedMessage
        defaultMessage="Integer or decimal number"
        id="uidu.data-fields.number.description"
      />
    ),
    icon: <FontAwesomeIcon icon={faHashtag} />,
    color: '#9291D0',
  },
  cell: ({ getValue, column }) => (
    <div tw="flex flex-grow justify-end">
      {column.columnDef.meta?.valueFormatter
        ? column.columnDef.meta?.valueFormatter(getValue())
        : getValue()}
    </div>
  ),
  Filter,
};

export default Number;
