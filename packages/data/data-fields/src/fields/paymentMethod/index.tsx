import { faCashRegister } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './renderer';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const PaymentMethod: ColumnDef<unknown, string> = {
  meta: {
    kind: 'paymentMethod',
    name: (
      <FormattedMessage
        defaultMessage="Payment method"
        id="uidu.data-fields.paymentMethod.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faCashRegister} />,
    color: 'darkmagenta',
    description: (
      <FormattedMessage
        defaultMessage="Payment method (Credit Card, or others)"
        id="uidu.data-fields.paymentMethod.description"
      />
    ),
  },
  cell: Cell,
  Filter,
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
