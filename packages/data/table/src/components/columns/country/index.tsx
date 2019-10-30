import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const countryField = {
  id: 'country',
  name: <FormattedMessage id="field.country.name" defaultMessage="Country" />,
  icon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
};

export default () => ({
  type: 'country',
  field: 'country',
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
  },
});
