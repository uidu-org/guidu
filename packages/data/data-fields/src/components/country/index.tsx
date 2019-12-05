import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const FilterForm = loadable(() => import('../../filters/SelectFilterForm'));

const Country: Field = {
  kind: 'country',
  name: <FormattedMessage id="field.country.name" defaultMessage="Country" />,
  icon: <FontAwesomeIcon icon={faGlobe} />,
  description: (
    <FormattedMessage
      id="field.country.description"
      defaultMessage="Add a Country select list to your record"
    />
  ),
  filterForm: FilterForm,
};

export default Country;
