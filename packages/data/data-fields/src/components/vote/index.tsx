import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'vote',
  name: <FormattedMessage id="field.vote.name" defaultMessage="Vote" />,
  icon: <FontAwesomeIcon icon={faPoll} />,
};
