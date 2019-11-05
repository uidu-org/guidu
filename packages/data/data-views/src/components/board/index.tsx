import React from 'react';
import { Columns } from 'react-feather';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'board',
  name: <FormattedMessage id="dataView.board.name" defaultMessage="Board" />,
  icon: Columns,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dataView.board.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
};
