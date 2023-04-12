import { faChevronCircleDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withOptions from '../../hoc/withOptions';
import Cell from './Cell';

export default withOptions({
  meta: {
    kind: 'singleSelect',
    name: (
      <FormattedMessage
        defaultMessage="SingleSelect"
        id="uidu.data-fields.singleSelect.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faChevronCircleDown} />,
    description: (
      <FormattedMessage
        defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
        id="uidu.data-fields.singleSelect.description"
      />
    ),
    color: '#76AEBD',
  },
  cell: Cell,
  mocks: {
    value: 'foo',
    options: [
      { id: 'foo', name: 'foo' },
      { id: 'bar', name: 'bar' },
    ],
  },
});
