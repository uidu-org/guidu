import { faFile } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Attachments: ColumnDef<unknown> = {
  meta: {
    kind: 'attachments',
    name: (
      <FormattedMessage
        defaultMessage="Files"
        id="uidu.data-fields.files.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faFile} />,
    description: (
      <FormattedMessage
        defaultMessage="Attachments allow you to add images, documents, or other files which can then be viewed or downloaded."
        id="uidu.data-fields.files.description"
      />
    ),
    color: '#8093A6',
  },
  cell: Cell,
  mocks,
};

export default Attachments;
