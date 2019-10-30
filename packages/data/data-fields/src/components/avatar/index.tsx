import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'avatar',
  name: <FormattedMessage id="field.avatar.name" defaultMessage="Avatar" />,
  icon: <FontAwesomeIcon icon={faUserCircle} />,
  description: (
    <FormattedMessage
      id="field.avatar.description"
      defaultMessage="Insert a rounded avatar for the record"
    />
  ),
};
