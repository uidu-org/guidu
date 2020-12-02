import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Rating: Field = {
  kind: 'rating',
  name: <FormattedMessage defaultMessage="Rating" />,
  icon: <FontAwesomeIcon icon={faStar} />,
  color: 'burlywood',
};

export default Rating;
