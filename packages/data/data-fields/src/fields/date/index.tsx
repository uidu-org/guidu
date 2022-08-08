import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
  cell: ({ getValue, column }) => {
    if (!getValue()) {
      return null;
    }

    // we should ensure value is an utc date, if not force it
    const cleaned = getValue().endsWith('Z') ? getValue() : `${getValue()}Z`;
    const convertedIntoUTC = dayjs(cleaned).utc().format();

    return (
      <div tw="flex w-full justify-between">
        {dayjs(convertedIntoUTC).format('L')}
        <span>{dayjs(convertedIntoUTC).format('LT')}</span>
      </div>
    );
  },
  Filter,
  Grouper,
  // cellEditorFramework: Editor,
  // filter: 'agDateColumnFilter',
  mocks: {
    value: '2021-09-14T11:07:03.000Z',
  },
};

export default Date;
