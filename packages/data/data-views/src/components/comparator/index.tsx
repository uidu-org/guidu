import React from 'react';
import { Trello } from 'react-feather';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'comparator',
  name: (
    <FormattedMessage
      id="dataView.comparator.name"
      defaultMessage="Comparator"
    />
  ),
  icon: Trello,
  color: '#D08770',
  description: (
    <FormattedMessage
      id="dataView.comparator.description"
      defaultMessage="Single select allows you to select a single option from predefined options in a dropdown."
    />
  ),
};
