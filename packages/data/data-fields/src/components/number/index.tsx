import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'number',
  name: <FormattedMessage id="field.number.name" defaultMessage="Number" />,
  icon: <FontAwesomeIcon icon={faHashtag} />,
};
