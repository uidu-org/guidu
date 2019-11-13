import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

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
};

export default PaymentMethod;
