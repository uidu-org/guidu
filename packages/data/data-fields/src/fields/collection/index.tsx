import { faBars } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Collection: ColumnDef<unknown> = {
  meta: {
    kind: 'collection',
    name: (
      <FormattedMessage
        id="uidu.data-fields.collection.name"
        defaultMessage="Collection"
      />
    ),
    icon: <FontAwesomeIcon icon={faBars} />,
    description: (
      <FormattedMessage
        id="uidu.data-fields.collection.description"
        defaultMessage="A collection is a list of items with one or more fields."
      />
    ),
    color: '#73BEC8',
  },
  mocks: {
    value: 'foo',
    options: [
      { id: 'foo', name: 'foo' },
      { id: 'bar', name: 'bar' },
    ],
  },
};

export default Collection;
