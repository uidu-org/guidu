import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Editor from './editor';
import Renderer from './renderer';

export default field => ({
  type: 'member',
  cellRenderer: Renderer,
  cellRendererParams: field,
  cellEditorFramework: Editor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faUsers} />,
  },
});
