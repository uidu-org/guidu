import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Uid: Field = {
  kind: 'uid',
  name: <FormattedMessage defaultMessage="ID" id="uidu.data-fields.uid.name" />,
  icon: <FontAwesomeIcon icon={faIdBadge} />,
  description: (
    <FormattedMessage
      defaultMessage="A unique identifier field"
      id="uidu.data-fields.uid.description"
    />
  ),
  color: 'cornflowerblue',
  pinned: 'left',
  canHide: false,
  lockPinned: true,
  lockPosition: true,
  resizable: false,
  // checkboxSelection: true,
  // headerCheckboxSelection: true,
  minWidth: 56,
  width: 56,
  maxWidth: 56,
  disableResizing: true,
  suppressMenu: true,
  sortable: false,
  cellStyle: {
    padding: '0rem',
    borderRight: 0,
  },
  headerValueGetter: () => null,
  // do not export to CSV/Excel the global ID field
  disableExport: true,
};

export default Uid;
