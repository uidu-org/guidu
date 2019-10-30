import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const stringField = {
  id: 'string',
  name: <FormattedMessage id="field.string.name" defaultMessage="String" />,
  icon: <FontAwesomeIcon icon={faFont} />,
};

export default () => ({
  type: 'string',
  field: 'string',
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faFont} /> },
});
