import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Editor from './editor';
// import Renderer from './renderer';

export default field => ({
  // cellRendererFramework: Renderer,
  cellEditorFramework: Editor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: {
    menuIcon: <FontAwesomeIcon icon={faListUl} />,
  },
});
