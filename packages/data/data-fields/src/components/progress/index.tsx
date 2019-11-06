import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const Progress: Field = {
  kind: 'progress',
  name: <FormattedMessage id="field.progress.name" defaultMessage="Progress" />,
  icon: <FontAwesomeIcon icon={faTasks} />,
};

export default Progress;
