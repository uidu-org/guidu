import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './renderer';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const PaymentMethod: Partial<Field> = {
  kind: 'paymentMethod',
  name: <FormattedMessage defaultMessage="Payment method" />,
  icon: <FontAwesomeIcon icon={faCashRegister} />,
  color: 'darkmagenta',
  description: (
    <FormattedMessage defaultMessage="Payment method (Credit Card, or others)" />
  ),
  Filter,
  Cell,
  // getQuickFilterText: (params) => (params.value ? params.value.name : null),
  // filterValueGetter: (params) => params.data[field.id],
  // options: field.options,
  // valueGetter: ({ data }) => {
  //   if (!data) {
  //     return null;
  //   }

  //   return field.options.filter((option) => option.id === data[field.id])[0];
  // },
};

export default PaymentMethod;
