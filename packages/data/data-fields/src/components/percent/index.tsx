import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'percent',
  name: <FormattedMessage id="field.percent.name" defaultMessage="Percent" />,
  icon: <FontAwesomeIcon icon={faPercent} />,
};
