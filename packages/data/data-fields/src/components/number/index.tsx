import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const FilterForm = loadable(() => import('../../filters/NumberFilterForm'));

const Number: Field = {
  kind: 'number',
  name: <FormattedMessage id="field.number.name" defaultMessage="Number" />,
  icon: <FontAwesomeIcon icon={faHashtag} />,
  filterForm: FilterForm,
};

export default Number;
