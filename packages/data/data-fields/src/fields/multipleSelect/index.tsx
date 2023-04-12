import { faListUl } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withOptions from '../../hoc/withOptions';
import Cell from './Cell';

export default withOptions({
  meta: {
    kind: 'multipleSelect',
    name: (
      <FormattedMessage
        id="uidu.data-fields.multipleSelect.name"
        defaultMessage="MultipleSelect"
      />
    ),
    icon: <FontAwesomeIcon icon={faListUl} />,
    description: (
      <FormattedMessage
        id="uidu.data-fields.multipleSelect.description"
        defaultMessage="Multiple select allows you to select one or more predefined options listed below."
      />
    ),
    color: '#73BEC8',
  },
  cell: Cell,
  mocks: {
    value: ['foo', 'bar'],
    options: [
      { id: 'foo', name: 'foo' },
      { id: 'bar', name: 'bar' },
    ],
  },
});
