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
    return (
      <>
        <div tw="flex w-full justify-between">
          {dayjs(params.value).utc(true).format('L')}
          <span>{dayjs(params.value).utc(true).format('LT')}</span>
        </div>
      </>
    );
  },
  mocks: {
    value: dayjs().toString(),
  },
};

export default Date;
