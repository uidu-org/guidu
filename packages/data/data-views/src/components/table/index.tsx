import React from 'react';
import { AlignJustify } from 'react-feather';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'table',
  name: <FormattedMessage id="dataView.table.name" defaultMessage="Table" />,
  icon: AlignJustify,
  color: '#BF616A',
  description: (
    <FormattedMessage
      id="dataView.table.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
};
