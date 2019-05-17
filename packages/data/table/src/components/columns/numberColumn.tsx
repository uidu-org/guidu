import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  // cellEditorFramework: DatePicker,
  filter: 'agNumberColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faHashtag} /> },
  // valueFormatter: ({ value }) => moment(value).format('L'),
});
