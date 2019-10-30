import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const attachmentsField = {
  id: 'attachments',
  name: <FormattedMessage id="field.attachments.name" defaultMessage="Files" />,
  icon: <FontAwesomeIcon icon={faFile} />,
};

export default () => ({
  filter: 'agTextColumnFilter',
  type: 'attachments',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faFile} /> },
});
