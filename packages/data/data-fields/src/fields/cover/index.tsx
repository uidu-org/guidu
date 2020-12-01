import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Cover: Field = {
  kind: 'cover',
  name: <FormattedMessage defaultMessage="Cover" />,
  icon: <FontAwesomeIcon icon={faImage} color="#fff" />,
  description: (
    <FormattedMessage defaultMessage="Add a cover image to your record" />
  ),
  canSortBy: false,
  color: 'skyblue',
};

export default Cover;
