import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';// import SingleSelectRenderer from '../renderers/SingleSelect';
import SingleSelectEditor from '../editors/SingleSelect';

export default field => ({
  cellEditorFramework: SingleSelectEditor,
  cellEditorParams: {
    options: field.options,
  },
  filter: 'agTextColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faChevronCircleDown} /> },
  // cellRendererFramework: SingleSelectRenderer,
});
