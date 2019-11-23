import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const StringForm = loadable(() => import('./form'));
const FilterForm = loadable(() => import('../../filters/TextFilterForm'));

const String: Field = {
  kind: 'string',
  name: <FormattedMessage id="field.string.name" defaultMessage="String" />,
  icon: <FontAwesomeIcon icon={faFont} />,
  description: (
    <FormattedMessage
      id="field.string.description"
      defaultMessage="A single line of text. You can optionally prefill each new cell with a default value"
    />
  ),
  form: StringForm,
  filterForm: FilterForm,
};

export default String;
