import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import withOptions from '../../hoc/withOptions';

export default withOptions({
  kind: 'multipleSelect',
  name: (
    <FormattedMessage
      id="field.multipleselect.name"
      defaultMessage="MultipleSelect"
    />
  ),
  icon: <FontAwesomeIcon icon={faListUl} />,
  description: (
    <FormattedMessage
      id="field.singleSelect.description"
      defaultMessage="Multiple select allows you to select one or more predefined options listed below."
    />
  ),
  color: '#73BEC8',
  mocks: {
    value: ['foo'],
    options: [
      { id: 'foo', name: 'foo' },
      { id: 'bar', name: 'bar' },
    ],
  },
});
