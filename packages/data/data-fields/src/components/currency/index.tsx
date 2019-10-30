import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'currency',
  name: <FormattedMessage id="field.currency.name" defaultMessage="Currency" />,
  icon: <FontAwesomeIcon icon={faEuroSign} />,
};
