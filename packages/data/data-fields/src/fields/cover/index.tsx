import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Cover: Field = {
  kind: 'cover',
  name: (
    <FormattedMessage defaultMessage="Cover" id="uidu.data-fields.cover.name" />
  ),
  icon: <FontAwesomeIcon icon={faImage} />,
  description: (
    <FormattedMessage
      defaultMessage="Add a cover image to your record"
      id="uidu.data-fields.cover.description"
    />
  ),
  canSortBy: false,
  isPrivate: true,
  color: 'skyblue',
};

export default Cover;
