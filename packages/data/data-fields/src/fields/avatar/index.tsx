import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const mocks = loadable(() => import('./mocks'));

const Avatar: Field = {
  kind: 'avatar',
  name: (
    <FormattedMessage
      defaultMessage="Avatar"
      id="uidu.data-fields.avatar.name"
    />
  ),
  icon: <FontAwesomeIcon icon={faUserCircle} />,
  description: (
    <FormattedMessage
      defaultMessage="Insert a rounded avatar for the record"
      id="uidu.data-fields.avatar.description"
    />
  ),
  color: 'teal',
  canSortBy: false,
  isPrivate: true,
  mocks,
};

export default Avatar;
