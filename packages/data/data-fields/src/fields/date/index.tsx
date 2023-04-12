import { faCalendarDay } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

dayjs.extend(localizedFormat);
dayjs.extend(utc);

const Grouper = loadable(() => import('./Grouper'));
const Filter = loadable(
  () => import('../../components/filters/DateFilterForm'),
);

const Date: ColumnDef<unknown, string> = {
  meta: {
    kind: 'date',
    name: (
      <FormattedMessage defaultMessage="Date" id="uidu.data-fields.date.name" />
    ),
    icon: <FontAwesomeIcon icon={faCalendarDay} />,
    description: (
      <FormattedMessage
        defaultMessage="Enter a date (e.g. 11/12/2013) or pick one from a calendar."
        id="uidu.data-fields.date.description"
      />
    ),
    color: '#EF8A78',
  },
  cell: Cell,
  Filter,
  Grouper,
  // cellEditorFramework: Editor,
  // filter: 'agDateColumnFilter',
  mocks: {
    value: '2021-09-14T11:07:03.000Z',
  },
};

export default Date;
