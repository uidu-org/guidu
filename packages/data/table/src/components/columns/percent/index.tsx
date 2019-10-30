import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const percentField = {
  id: 'percent',
  name: <FormattedMessage id="field.percent.name" defaultMessage="Percent" />,
  icon: <FontAwesomeIcon icon={faPercent} />,
};

export default () => ({
  filter: 'agNumberColumnFilter',
  type: ['numericColumn', 'percent'],
  field: 'percent',
  valueFormatter: ({ value }) => `${value}%`,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faPercent} /> },
});
