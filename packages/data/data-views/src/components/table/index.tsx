import loadable from '@loadable/component';
import React from 'react';
import { AlignJustify } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { DataViewKind } from '../../types';

const Controls = loadable(() => import('./controls'));

const Table: DataViewKind = {
  id: 'table',
  name: <FormattedMessage defaultMessage="Table" />,
  icon: AlignJustify,
  color: '#BF616A',
  description: (
    <FormattedMessage defaultMessage="Single select allows you to select a single option from predefined options in a dropdown." />
  ),
  controls: Controls,
};

export default Table;
