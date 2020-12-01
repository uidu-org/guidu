import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Percent: Field = {
  kind: 'percent',
  name: <FormattedMessage defaultMessage="Percent" />,
  icon: <FontAwesomeIcon icon={faPercent} color="#fff" />,
  color: 'darkkhaki',
  valueFormatter: ({ value }) => `${value}%`,
  aggregate: 'average',
  cellStyle: { justifyContent: 'flex-end' },
};

export default Percent;
