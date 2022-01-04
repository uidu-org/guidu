import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/NumberFilterForm'),
);

const Currency: Partial<Field> = {
  kind: 'currency',
  name: (
    <FormattedMessage
      defaultMessage="Currency"
      id="uidu.data-fields.currency.name"
    />
  ),
  description: (
    <FormattedMessage
      defaultMessage="Format a number with a currency"
      id="uidu.data-fields.currency .description"
    />
  ),
  icon: <FontAwesomeIcon icon={faEuroSign} />,
  color: 'sandybrown',
  Filter,
  cellStyle: { justifyContent: 'flex-end' },
  aggregate: 'sum',
};

export default Currency;
