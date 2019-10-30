import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const voteField = {
  id: 'vote',
  name: <FormattedMessage id="field.vote.name" defaultMessage="Vote" />,
  icon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
};

export default () => ({
  type: 'vote',
  field: 'vote',
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
  },
});
