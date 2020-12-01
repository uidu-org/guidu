import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './renderer';

const Progress: Field = {
  kind: 'progress',
  name: <FormattedMessage defaultMessage="Progress" />,
  icon: <FontAwesomeIcon icon={faTasks} color="#fff" />,
  color: 'darkseagreen',
  Cell,
};

export default Progress;
