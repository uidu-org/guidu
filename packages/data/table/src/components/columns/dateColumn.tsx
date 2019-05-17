import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import DatePicker from '../editors/DatePicker';

export default () => ({
  cellEditorFramework: DatePicker,
  filter: 'agDateColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faCalendarDay} /> },
  valueFormatter: ({ value }) => moment(value).format('L'),
});
