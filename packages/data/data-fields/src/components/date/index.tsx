import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Date: Field = {
  kind: 'date',
  name: <FormattedMessage id="field.date.name" defaultMessage="Date" />,
  icon: <FontAwesomeIcon icon={faCalendarDay} />,
  description: (
    <FormattedMessage
      id="field.date.description"
      defaultMessage="Enter a date (e.g. 11/12/2013) or pick one from a calendar."
    />
  ),
};

export default Date;
