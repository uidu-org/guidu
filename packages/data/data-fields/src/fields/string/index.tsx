import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const String: ColumnDef<unknown, string> = {
  meta: {
    kind: 'string',
    name: (
      <FormattedMessage
        defaultMessage="String"
        id="uidu.data-fields.string.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faFont} />,
    description: (
      <FormattedMessage
        defaultMessage="A single line of text. You can optionally prefill each new cell with a default value"
        id="uidu.data-fields.string.description"
      />
    ),
    color: '#E4BA3F',
  },
  cell: (props) => <div tw="truncate">{props.getValue()}</div>,
  Filter,
};

export default String;
