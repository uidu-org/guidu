import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const coverField = {
  id: 'cover',
  name: <FormattedMessage id="field.cover.name" defaultMessage="Cover" />,
  icon: <FontAwesomeIcon icon={faImage} />,
};

export default () => ({
  type: 'cover',
  field: 'cover',
  sortable: false,
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faImage} />,
  },
});
