import { faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Email: Field = {
  kind: 'email',
  name: <FormattedMessage id="field.email.name" defaultMessage="Email" />,
  icon: <FontAwesomeIcon icon={faAt} />,
  description: (
    <FormattedMessage
      id="field.email.description"
      defaultMessage="A valid email address (e.g. andrew@example.com)."
    />
  ),
};

export default Email;
