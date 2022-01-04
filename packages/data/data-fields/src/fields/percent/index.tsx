import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Percent: Field = {
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
  valueFormatter: ({ value }) => `${value}%`,
  aggregate: 'average',
  cellStyle: { justifyContent: 'flex-end' },
};

export default Percent;
