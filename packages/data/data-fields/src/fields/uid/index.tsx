import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Uid: Field = {
  kind: 'uid',
  name: <FormattedMessage defaultMessage="ID" />,
  icon: <FontAwesomeIcon icon={faIdBadge} color="#fff" />,
  description: <FormattedMessage defaultMessage="A unique identifier field" />,
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
  headerClass: 'border-right-0 pr-0',
  headerValueGetter: () => null,
};

export default Uid;
