import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const FilterForm = loadable(() => import('../../filters/NumberFilterForm'));

const Currency: Field = {
  kind: 'currency',
  name: <FormattedMessage id="field.currency.name" defaultMessage="Currency" />,
  icon: <FontAwesomeIcon icon={faEuroSign} />,
  filterForm: FilterForm,
};

export default Currency;
