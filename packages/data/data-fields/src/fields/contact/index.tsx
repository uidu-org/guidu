import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Contact: Field = {
  kind: 'contact',
  name: <FormattedMessage defaultMessage="Contact" />,
  icon: <FontAwesomeIcon icon={faUsers} />,
  color: '#0AC29A',
  description: (
    <FormattedMessage defaultMessage="A contact field represents a person or an organization - a contact" />
  ),
  Filter,
  Cell,
};

export default Contact;
