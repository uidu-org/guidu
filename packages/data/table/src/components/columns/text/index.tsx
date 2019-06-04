import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'text',
  filter: 'agTextColumnFilter',
  cellEditor: 'agLargeTextCellEditor',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faParagraph} /> },
});
