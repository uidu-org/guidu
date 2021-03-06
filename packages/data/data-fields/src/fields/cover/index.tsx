import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Cover: Field = {
  kind: 'cover',
  name: <FormattedMessage defaultMessage="Cover" />,
  icon: <FontAwesomeIcon icon={faImage} />,
  description: (
    <FormattedMessage defaultMessage="Add a cover image to your record" />
  ),
  canSortBy: false,
  isPrivate: true,
  color: 'skyblue',
};

export default Cover;
