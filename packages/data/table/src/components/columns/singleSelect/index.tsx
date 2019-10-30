import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Editor from './editor';

export const singleSelectField = {
  id: 'singleselect',
  name: (
    <FormattedMessage
      id="field.singleselect.name"
      defaultMessage="SingleSelect"
    />
  ),
  icon: <FontAwesomeIcon icon={faChevronCircleDown} />,
};

export default field => ({
  type: 'singleSelect',
  field: 'singleSelect',
  cellEditorFramework: Editor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faChevronCircleDown} />,
  },
});
