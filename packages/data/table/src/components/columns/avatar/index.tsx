import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const avatarField = {
  id: 'avatar',
  name: <FormattedMessage id="field.avatar.name" defaultMessage="Avatar" />,
  icon: <FontAwesomeIcon icon={faUserCircle} />,
};

export default () => ({
  type: 'avatar',
  field: 'avatar',
  sortable: false,
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faUserCircle} />,
  },
});
