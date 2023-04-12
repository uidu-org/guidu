import { faAt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Email: ColumnDef<unknown, string> = {
  meta: {
    kind: 'email',
    name: (
      <FormattedMessage
        defaultMessage="Email"
        id="uidu.data-fields.email.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faAt} />,
    description: (
      <FormattedMessage
        defaultMessage="A valid email address (e.g. andrew@example.com)."
        id="uidu.data-fields.email.description"
      />
    ),
    color: '#5AAA8F',
  },
  cell: Cell,
  Filter,
  mocks: {
    value: 'info@uidu.org',
  },
};

export default Email;
