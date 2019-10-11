import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import Editor from './editor';

export default ({ format = 'L' }) => ({
  type: 'date',
  cellEditorFramework: Editor,
  filter: 'agDateColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faCalendarDay} /> },
  valueFormatter: ({ value }) => moment(value).format(format),
  cellClass: 'justify-content-center',
  headerClass: 'text-center',
});
