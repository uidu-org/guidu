import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Form = loadable(() => import('./form'));

const Appointment: Partial<Field> = {
  kind: 'appointment',
  name: <FormattedMessage defaultMessage="Appointment" />,
  icon: <FontAwesomeIcon icon={faIdBadge} />,
  description: (
    <FormattedMessage defaultMessage="Allow booking an appointment for this record, based on your of your availabilities" />
  ),
  color: 'cornflowerblue',
  form: Form,
};

export default Appointment;
