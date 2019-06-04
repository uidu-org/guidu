import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default () => ({
  type: 'progress',
  filter: 'agNumberColumnFilter',
  // cellRendererFramework: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faTasks} /> },
});
