import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Uid: ColumnDef<unknown, string> = {
  meta: {
    kind: 'uid',
    name: (
      <FormattedMessage defaultMessage="ID" id="uidu.data-fields.uid.name" />
    ),
    icon: <FontAwesomeIcon icon={faIdBadge} />,
    description: (
      <FormattedMessage
        defaultMessage="A unique identifier field"
        id="uidu.data-fields.uid.description"
      />
    ),
    color: 'cornflowerblue',
    pinned: 'left',
  },
  enableHiding: false,
  enableResizing: false,
  minSize: 56,
  size: 56,
  maxSize: 56,
  enableSorting: false,
  // do not export to CSV/Excel the global ID field
  suppressMenu: true,
  disableExport: true,
  lockPosition: true,
};

export default Uid;
