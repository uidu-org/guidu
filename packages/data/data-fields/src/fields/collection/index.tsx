import React from 'react';
import { FormattedMessage } from 'react-intl';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { Field } from '../../types';

const CollectionFormWithFields = loadable(() => import('./form'));

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
  form: CollectionFormWithFields,
};

export default Collection;
