import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const urlField = {
  id: 'url',
  name: <FormattedMessage id="field.url.name" defaultMessage="Url" />,
  icon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
};

export default () => ({
  type: 'url',
  field: 'url',
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
  },
});
