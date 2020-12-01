import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withOptions from '../../hoc/withOptions';
import Cell from './renderer';

export default withOptions({
  kind: 'singleSelect',
  name: <FormattedMessage defaultMessage="SingleSelect" />,
  icon: <FontAwesomeIcon icon={faChevronCircleDown} color="#fff" />,
  description: (
    <FormattedMessage defaultMessage="Single select allows you to select a single option from predefined options in a dropdown." />
  ),
  color: '#76AEBD',
  Cell,
});
