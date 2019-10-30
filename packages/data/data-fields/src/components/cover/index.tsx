import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'cover',
  name: <FormattedMessage id="field.cover.name" defaultMessage="Cover" />,
  icon: <FontAwesomeIcon icon={faImage} />,
  description: (
    <FormattedMessage
      id="field.cover.description"
      defaultMessage="Add a cover image to your record"
    />
  ),
};
