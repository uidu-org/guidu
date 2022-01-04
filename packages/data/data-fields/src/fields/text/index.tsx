import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const mocks = loadable(() => import('./mocks'));

const Text: Field = {
  kind: 'text',
  name: (
    <FormattedMessage defaultMessage="Text" id="uidu.data-fields.text.name" />
  ),
  icon: <FontAwesomeIcon icon={faParagraph} />,
  description: (
    <FormattedMessage
      id="uidu.data-fields.text.description"
      defaultMessage="A long text field that can span multiple lines."
    />
  ),
  color: '#CB732B',
  Filter,
  Cell: (params) => <div tw="truncate">{params.value}</div>,
  mocks,
};

export default Text;
