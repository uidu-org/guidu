import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'country',
  name: <FormattedMessage id="field.country.name" defaultMessage="Country" />,
  icon: <FontAwesomeIcon icon={faGlobe} />,
  description: (
    <FormattedMessage
      id="field.country.description"
      defaultMessage="Add a Country select list to your record"
    />
  ),
};
