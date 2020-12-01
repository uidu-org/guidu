import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Url: Field = {
  kind: 'url',
  name: <FormattedMessage defaultMessage="Url" />,
  icon: <FontAwesomeIcon icon={faExternalLinkAlt} color="#fff" />,
  color: '#B0B480',
  description: (
    <FormattedMessage
      id="field.url.description"
      defaultMessage="A valid URL (e.g. airtable.com or https://airtable.com/universe)."
    />
  ),
  Filter,
};

export default Url;
