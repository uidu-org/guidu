import { faAlignLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const mocks = loadable(() => import('./mocks'));

const RichText: ColumnDef<unknown, object> = {
  meta: {
    kind: 'richText',
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
  },
  cell: (props) => (
    <div tw="truncate">{JSON.stringify(props.getValue(), null, 2)}</div>
  ),
  Filter,
  mocks,
};

export default RichText;
