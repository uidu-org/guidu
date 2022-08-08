import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Percent: ColumnDef<unknown, number> = {
  meta: {
    kind: 'percent',
    name: (
      <FormattedMessage
        defaultMessage="Percent"
        id="uidu.data-fields.percent.name"
      />
    ),
    description: (
      <FormattedMessage
        defaultMessage="Format a percentage"
        id="uidu.data-fields.percent.description"
      />
    ),
    icon: <FontAwesomeIcon icon={faPercent} />,
    color: 'darkkhaki',
    valueFormatter: (value) => `${value}%`,
  },
  cell: (props) => <div tw="flex justify-end flex-grow">>{props.getValue()}</div>,
  aggregate: 'average',
};

export default Percent;
