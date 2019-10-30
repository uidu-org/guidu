import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Renderer from './renderer';

export const checkboxField = {
  id: 'checkbox',
  name: <FormattedMessage id="field.checkbox.name" defaultMessage="Checkbox" />,
  icon: <FontAwesomeIcon icon={faCheckSquare} />,
};

export default () => ({
  // cellEditorFramework: DatePicker,
  type: 'checkbox',
  field: 'checkbox',
  filter: 'agDateColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faCheckSquare} /> },
});
