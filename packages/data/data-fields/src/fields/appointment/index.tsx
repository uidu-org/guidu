import { faIdBadge } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Appointment: ColumnDef<unknown> = {
  meta: {
    kind: 'appointment',
    name: (
      <FormattedMessage
        defaultMessage="Appointment"
        id="uidu.data-fields.appointment.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faIdBadge} />,
    description: (
      <FormattedMessage
        defaultMessage="Allow booking an appointment for this record, based on your of your availabilities"
        id="uidu.data-fields.appointment.description"
      />
    ),
    color: '#6495ed',
  },
};

export default Appointment;
