import { faPercent } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Cell from './Cell';

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
  cell: Cell,
  aggregate: 'average',
};

export default Percent;
