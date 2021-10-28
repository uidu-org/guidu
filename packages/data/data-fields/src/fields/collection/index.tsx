import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Collection: Partial<Field> = {
  kind: 'collection',
  name: (
    <FormattedMessage id="field.collection.name" defaultMessage="Collection" />
  ),
  icon: <FontAwesomeIcon icon={faBars} />,
  description: (
    <FormattedMessage
      id="field.collection.options"
      defaultMessage="A collection is a list of items with one or more fields."
    />
  ),
  color: '#73BEC8',
  mocks: {
    value: 'foo',
    options: [
      { id: 'foo', name: 'foo' },
      { id: 'bar', name: 'bar' },
    ],
  },
};

export default Collection;
