import { faUsers } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Contact: ColumnDef<unknown> = {
  meta: {
    kind: 'contact',
    name: (
      <FormattedMessage
        defaultMessage="Contact"
        id="uidu.data-fields.contact.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faUsers} />,
    color: '#0AC29A',
    description: (
      <FormattedMessage
        defaultMessage="A contact field represents a person or an organization - a contact"
        id="uidu.data-fields.contact.description"
      />
    ),
  },
  cell: Cell,
  Filter,
};

export default Contact;
