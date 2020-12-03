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
  icon: <FontAwesomeIcon icon={faCalendarDay} />,
  description: (
    <FormattedMessage defaultMessage="Enter a date (e.g. 11/12/2013) or pick one from a calendar." />
  ),
  color: '#EF8A78',
  Filter,
  grouperForm: GrouperForm,
  // cellEditorFramework: Editor,
  // filter: 'agDateColumnFilter',
  Cell: (params) =>
    params.value ? <div className="text-truncate">{params.value}</div> : null,
};

export default Date;
