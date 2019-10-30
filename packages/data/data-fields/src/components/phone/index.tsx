import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'phone',
  name: <FormattedMessage id="field.phone.name" defaultMessage="Phone" />,
  icon: <FontAwesomeIcon icon={faPhone} />,
  description: (
    <FormattedMessage
      id="field.phone.description"
      defaultMessage="A telephone number (e.g. (415) 555-9876)."
    />
  ),
};
