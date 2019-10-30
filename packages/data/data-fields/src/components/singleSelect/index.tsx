import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  id: 'singleSelect',
  name: (
    <FormattedMessage
      id="field.singleselect.name"
      defaultMessage="SingleSelect"
    />
  ),
  icon: <FontAwesomeIcon icon={faChevronCircleDown} />,
  description: <FormattedMessage id="field.singleSelect.description" defaultMessage="Single select allows you to select a single option from predefined options in a dropdown." />,
};
