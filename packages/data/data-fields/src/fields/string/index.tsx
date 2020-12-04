import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

// const StringForm = loadable(() => import('./form'));
const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const String: Field = {
  kind: 'string',
  name: <FormattedMessage defaultMessage="String" />,
  icon: <FontAwesomeIcon icon={faFont} />,
  description: (
    <FormattedMessage defaultMessage="A single line of text. You can optionally prefill each new cell with a default value" />
  ),
  color: '#E4BA3F',
  // form: StringForm,
  Filter,
};

export default String;
