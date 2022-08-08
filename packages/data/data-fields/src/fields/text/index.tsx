import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Filter = loadable(
  () => import('../../components/filters/TextFilterForm'),
);

const mocks = loadable(() => import('./mocks'));

const Text: ColumnDef<unknown, string> = {
  meta: {
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
  },
  cell: (props) => <div tw="truncate">{props.getValue()}</div>,
  Filter,
  mocks,
};

export default Text;
