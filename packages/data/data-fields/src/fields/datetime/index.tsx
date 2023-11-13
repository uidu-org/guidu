import { faClock } from '@fortawesome/pro-regular-svg-icons';
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

const Datetime: ColumnDef<unknown, string> = {
  meta: {
    kind: 'datetime',
    name: (
      <FormattedMessage
        defaultMessage="Datetime"
        id="uidu.data-fields.datetime.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faClock} />,
    description: (
      <FormattedMessage
        defaultMessage="Enter a date (e.g. 11/12/2013) or pick one from a calendar."
        id="uidu.data-fields.datetime.description"
      />
    ),
    color: '#36B37E',
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

export default Datetime;
