import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Renderer from './renderer';

export default () => ({
  // cellEditorFramework: DatePicker,
  type: 'checkbox',
  filter: 'agDateColumnFilter',
  cellRendererFramework: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faCheckSquare} /> },
});
