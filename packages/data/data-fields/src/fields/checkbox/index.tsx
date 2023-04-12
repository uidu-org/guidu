import { faCheckSquare } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Checkbox: ColumnDef<unknown> = {
  meta: {
    kind: 'checkbox',
    name: (
      <FormattedMessage
        defaultMessage="Checkbox"
        id="uidu.data-fields.checkbox.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faCheckSquare} />,
    description: (
      <FormattedMessage
        defaultMessage="A single checkbox that can be checked or unchecked."
        id="uidu.data-fields.checkbox.description"
      />
    ),
    color: '#C75875',
  },
  cell: Cell,
  mocks,
};

export default Checkbox;
