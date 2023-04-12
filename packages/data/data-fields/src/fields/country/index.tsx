import { faGlobe } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import { allCountries } from '@uidu/select';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const mocks = loadable(() => import('./mocks'));

const Country: ColumnDef<unknown> = {
  meta: {
    kind: 'country',
    name: (
      <FormattedMessage
        defaultMessage="Country"
        id="uidu.data-fields.country.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faGlobe} />,
    description: (
      <FormattedMessage
        defaultMessage="Add a Country select list to your record"
        id="uidu.data-fields.country.description"
      />
    ),
    color: 'tan',
    options: allCountries,
  },
  Filter,
  cell: Cell,
  mocks,
};

export default Country;
