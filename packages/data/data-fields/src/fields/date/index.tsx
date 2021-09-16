import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

dayjs.extend(localizedFormat);
dayjs.extend(utc);

const GrouperForm = loadable(() => import('./GrouperForm'));
const Filter = loadable(
  () => import('../../components/filters/DateFilterForm'),
);

const Date: Partial<Field> = {
  kind: 'date',
  name: <FormattedMessage defaultMessage="Date" />,
  icon: <FontAwesomeIcon icon={faCalendarDay} />,
  description: (
    <FormattedMessage defaultMessage="Enter a date (e.g. 11/12/2013) or pick one from a calendar." />
  ),
  color: '#EF8A78',
  Filter,
  grouperForm: GrouperForm,
  // cellEditorFramework: Editor,
  // filter: 'agDateColumnFilter',
  Cell: (params) => {
    if (!params.value) {
      return null;
    }

    // we should ensure value is an utc date, if not force it
    const cleaned = params.value.endsWith('Z')
      ? params.value
      : `${params.value}Z`;
    const convertedIntoUTC = dayjs(cleaned).utc().format();

    return (
      <>
        <div tw="flex w-full justify-between">
          {dayjs(convertedIntoUTC).format('L')}
          <span>{dayjs(convertedIntoUTC).format('LT')}</span>
        </div>
      </>
    );
  },
  mocks: {
    value: '2021-09-14T11:07:03.000Z',
  },
};

export default Date;
