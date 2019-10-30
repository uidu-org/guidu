import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const emailField = {
  id: 'email',
  name: <FormattedMessage id="field.email.name" defaultMessage="Email" />,
  icon: <FontAwesomeIcon icon={faFont} />,
};

export default () => ({
  type: 'email',
  field: 'email',
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faFont} /> },
});
