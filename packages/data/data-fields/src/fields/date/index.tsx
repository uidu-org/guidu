import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const GrouperForm = loadable(() => import('./GrouperForm'));
const Filter = loadable(
  () => import('../../components/filters/DateFilterForm'),
);

const Date: Partial<Field> = {
  kind: 'date',
  name: <FormattedMessage defaultMessage="Date" />,
  icon: <FontAwesomeIcon icon={faCalendarDay} color="#fff" />,
  description: (
    <FormattedMessage defaultMessage="Enter a date (e.g. 11/12/2013) or pick one from a calendar." />
  ),
  color: '#EF8A78',
  Filter,
  grouperForm: GrouperForm,
  // cellEditorFramework: Editor,
  // filter: 'agDateColumnFilter',
  // comparator: (valueA, valueB) => {
  //   if (valueA === null) {
  //     return -1;
  //   }
  //   if (valueB === null) {
  //     return 1;
  //   }

  //   return +valueA.momentObj - +valueB.momentObj;
  // },
  // valueGetter: (params) => {
  //   if (!params.data) {
  //     return null;
  //   }

  //   const momentObj = moment(params.data[field.id]);

  //   return {
  //     year: momentObj.format('YYYY'),
  //     month: momentObj.format('MMM YYYY'),
  //     day: momentObj.format('DDD MM YYYY'),
  //     momentObj,
  //   };
  // },
  Cell: (params) =>
    params.value ? <div className="text-truncate">{params.value}</div> : null,
};

export default Date;
