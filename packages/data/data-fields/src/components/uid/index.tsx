import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Uid: Field = {
  kind: 'uid',
  name: <FormattedMessage id="field.uid.name" defaultMessage="ID" />,
  icon: <FontAwesomeIcon icon={faIdBadge} />,
  description: (
    <FormattedMessage
      id="field.uid.description"
      defaultMessage="A unique identifier field"
    />
  ),
};

export default Uid;
