import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'string',
  name: <FormattedMessage id="field.string.name" defaultMessage="String" />,
  icon: <FontAwesomeIcon icon={faFont} />,
  description: (
    <FormattedMessage
      id="field.string.description"
      defaultMessage="A single line of text. You can optionally prefill each new cell with a default value"
    />
  ),
};
