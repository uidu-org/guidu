import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { numericComparator } from '../../../utils';

export const currencyField = {
  id: 'currency',
  name: <FormattedMessage id="field.currency.name" defaultMessage="Avatar" />,
  icon: <FontAwesomeIcon icon={faEuroSign} />,
};

export default () => ({
  type: ['numericColumn', 'currency'],
  field: 'currency',
  filter: 'agNumberColumnFilter',
  valueFormatter: ({ value }) => value,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faEuroSign} /> },
  comparator: numericComparator,
});
