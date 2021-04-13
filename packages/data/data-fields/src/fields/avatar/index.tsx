import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Avatar: Field = {
  kind: 'avatar',
  name: <FormattedMessage defaultMessage="Avatar" />,
  icon: <FontAwesomeIcon icon={faUserCircle} />,
  description: (
    <FormattedMessage defaultMessage="Insert a rounded avatar for the record" />
  ),
  color: 'teal',
  canSortBy: false,
  isPrivate: true,
};

export default Avatar;
