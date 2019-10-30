import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Editor from './editor';

export const dateField = {
  id: 'date',
  name: <FormattedMessage id="field.date.name" defaultMessage="Date" />,
  icon: <FontAwesomeIcon icon={faCalendarDay} />,
};

export default ({ format = 'L' }) => ({
  type: 'date',
  field: 'date',
  cellEditorFramework: Editor,
  filter: 'agDateColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faCalendarDay} /> },
  valueFormatter: ({ value }) => moment(value).format(format),
  cellClass: 'justify-content-center',
  headerClass: 'text-center',
});
