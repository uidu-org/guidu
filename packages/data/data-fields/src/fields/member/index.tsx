import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './Cell';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const Member: Field = {
  kind: 'member',
  name: (
    <FormattedMessage
      defaultMessage="Member"
      id="uidu.data-fields.member.name"
    />
  ),
  icon: <FontAwesomeIcon icon={faUsers} />,
  color: 'hotpink',
  description: (
    <FormattedMessage
      defaultMessage="A collaborator field lets you add collaborators to your records. Collaborators can optionally be notified when they're added."
      id="uidu.data-fields.member.description"
    />
  ),
  // Filter
  Cell,
};

export default Member;
