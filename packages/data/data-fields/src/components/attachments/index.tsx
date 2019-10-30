import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'attachments',
  name: <FormattedMessage id="field.attachments.name" defaultMessage="Files" />,
  icon: <FontAwesomeIcon icon={faFile} />,
  description: (
    <FormattedMessage
      id="field.attachments.description"
      defaultMessage="Attachments allow you to add images, documents, or other files which can then be viewed or downloaded."
    />
  ),
};
