import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'member',
  name: <FormattedMessage id="field.member.name" defaultMessage="Member" />,
  icon: <FontAwesomeIcon icon={faUsers} />, 
  description: <FormattedMessage id="field.member.description" defaultMessage="A collaborator field lets you add collaborators to your records. Collaborators can optionally be notified when they're added." />
};
