import loadable from '@loadable/component';
import React from 'react';
import { List as ListIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Controls = loadable(() => import('./controls'));

const List: DataViewKind = {
  id: 'list',
  name: (
    <FormattedMessage defaultMessage="List" id="uidu.data-views.list.name" />
  ),
  icon: ListIcon,
  color: '#E53E3E',
  description: (
    <FormattedMessage
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
      id="uidu.data-views.list.description"
    />
  ),
  controls: Controls,
};

export default List;
