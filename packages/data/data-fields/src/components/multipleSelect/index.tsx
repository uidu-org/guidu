import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// import Editor from './editor';
// import Renderer from './renderer';
import { FormattedMessage } from 'react-intl';
import withOptions from '../../hoc/withOptions';

export default withOptions({
  id: 'multipleSelect',
  name: (
    <FormattedMessage
      id="field.multipleselect.name"
      defaultMessage="MultipleSelect"
    />
  ),
  icon: <FontAwesomeIcon icon={faListUl} />,
  description: (
    <FormattedMessage
      id="field.singleSelect.description"
      defaultMessage="Multiple select allows you to select one or more predefined options listed below."
    />
  ),
});
