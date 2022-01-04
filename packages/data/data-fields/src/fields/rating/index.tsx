import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const mocks = loadable(() => import('./mocks'));

const Rating: Field = {
  kind: 'rating',
  name: (
    <FormattedMessage
      defaultMessage="Rating"
      id="uidu.data-fields.rating.name"
    />
  ),
  description: (
    <FormattedMessage
      defaultMessage="Insert a rating for the column"
      id="uidu.data-fields.rating.description"
    />
  ),
  icon: <FontAwesomeIcon icon={faStar} />,
  color: 'burlywood',
  Cell,
  mocks,
};

export default Rating;
