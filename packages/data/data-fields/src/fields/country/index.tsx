import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { allCountries } from '@uidu/select';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const mocks = loadable(() => import('./mocks'));

const Country: Field = {
  kind: 'country',
  name: <FormattedMessage defaultMessage="Country" />,
  icon: <FontAwesomeIcon icon={faGlobe} />,
  description: (
    <FormattedMessage defaultMessage="Add a Country select list to your record" />
  ),
  color: 'tan',
  Filter,
  Cell,
  cellProps: {
    options: allCountries,
  },
  mocks,
};

export default Country;
