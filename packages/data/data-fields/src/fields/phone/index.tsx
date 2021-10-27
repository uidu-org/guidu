import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Phone: Field = {
  kind: 'phone',
  name: <FormattedMessage defaultMessage="Phone" />,
  icon: <FontAwesomeIcon icon={faPhone} />,
  color: '#CB732B',
  description: (
    <FormattedMessage defaultMessage="A telephone number (e.g. (415) 555-9876)." />
  ),
  Filter,
  Cell,
};

export default Phone;
