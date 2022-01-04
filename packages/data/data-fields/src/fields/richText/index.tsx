import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const mocks = loadable(() => import('./mocks'));

const RichText: Field = {
  name: (
    <FormattedMessage
      defaultMessage="Rich Text"
      id="uidu.data-fields.richTex.name"
    />
  ),
  icon: <FontAwesomeIcon icon={faAlignLeft} />,
  description: (
    <FormattedMessage
      id="uidu.data-fields.richText.description"
      defaultMessage="A lightweight richtext editor."
    />
  ),
  color: '#618897',
  kind: 'richText',
  Filter,
  Cell: (params) => <div tw="truncate">{params.value}</div>,
  mocks,
};

export default RichText;
