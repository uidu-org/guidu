import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// import Editor from './editor';
// import Renderer from './renderer';
import { FormattedMessage } from 'react-intl';

export const multipleSelectField = {
  id: 'multipleselect',
  name: (
    <FormattedMessage
      id="field.multipleselect.name"
      defaultMessage="MultipleSelect"
    />
  ),
  icon: <FontAwesomeIcon icon={faListUl} />,
};

export default field => ({
  type: 'multipleSelect',
  field: 'multipleSelect',
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faListUl} />,
  },
});
