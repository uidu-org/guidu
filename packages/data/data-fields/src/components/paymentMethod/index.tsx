import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './renderer';

const FilterForm = loadable(() => import('../../filters/SelectFilterForm'));

const PaymentMethod: Field = {
  kind: 'paymentMethod',
  name: (
    <FormattedMessage
      id="field.paymentMethod.name"
      defaultMessage="Link to a record"
    />
  ),
  icon: <FontAwesomeIcon icon={faCashRegister} />,
  description: (
    <FormattedMessage
      id="field.paymentMethod.description"
      defaultMessage="Linked record fields contain blue tokens that represent links to other records."
    />
  ),
  filterForm: FilterForm,
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
