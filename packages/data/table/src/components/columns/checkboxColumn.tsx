import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Checkbox from '../renderers/Checkbox';

export default () => ({
  // cellEditorFramework: DatePicker,
  filter: 'agDateColumnFilter',
  cellRendererFramework: Checkbox,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faCheckSquare} /> },
});
