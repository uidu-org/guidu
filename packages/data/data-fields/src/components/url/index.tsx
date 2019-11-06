import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Url: Field = {
  kind: 'url',
  name: <FormattedMessage id="field.url.name" defaultMessage="Url" />,
  icon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
  description: (
    <FormattedMessage
      id="field.url.description"
      defaultMessage="A valid URL (e.g. airtable.com or https://airtable.com/universe)."
    />
  ),
};

export default Url;
