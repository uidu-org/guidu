import { faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const Email: Field = {
  kind: 'email',
  name: (
    <FormattedMessage defaultMessage="Email" id="uidu.data-fields.email.name" />
  ),
  icon: <FontAwesomeIcon icon={faAt} />,
  description: (
    <FormattedMessage
      defaultMessage="A valid email address (e.g. andrew@example.com)."
      id="uidu.data-fields.email.description"
    />
  ),
  color: '#5AAA8F',
  Filter,
  Cell: ({ value }) => <div tw="truncate">{value}</div>,
  mocks: {
    value: 'info@uidu.org',
  },
};

export default Email;
