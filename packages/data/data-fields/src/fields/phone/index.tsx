import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './renderer';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Phone: Field = {
  kind: 'phone',
  name: <FormattedMessage id="field.phone.name" defaultMessage="Phone" />,
  icon: <FontAwesomeIcon icon={faPhone} />,
  description: (
    <FormattedMessage
      id="field.phone.description"
      defaultMessage="A telephone number (e.g. (415) 555-9876)."
    />
  ),
  Filter,
  Cell,
};

export default Phone;
