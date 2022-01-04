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
  name: (
    <FormattedMessage defaultMessage="Url" id="uidu.data-fields.url.name" />
  ),
  icon: <FontAwesomeIcon icon={faExternalLinkAlt} />,
  color: '#B0B480',
  description: (
    <FormattedMessage
      id="uidu.data-fields.url.description"
      defaultMessage="A valid URL (e.g. airtable.com or https://airtable.com/universe)."
    />
  ),
  Filter,
};

export default Url;
