import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';
import Cell from './renderer';

const Filter = loadable(
  () => import('../../components/filters/SelectFilterForm'),
);

const Member: Field = {
  kind: 'member',
  name: <FormattedMessage id="field.member.name" defaultMessage="Member" />,
  icon: <FontAwesomeIcon icon={faUsers} />,
  description: (
    <FormattedMessage
      id="field.member.description"
      defaultMessage="A collaborator field lets you add collaborators to your records. Collaborators can optionally be notified when they're added."
    />
  ),
  // Filter
  Cell,
};

export default Member;
