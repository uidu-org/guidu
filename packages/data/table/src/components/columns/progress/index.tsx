import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Renderer from './renderer';

export default () => ({
  type: 'progress',
  filter: 'agNumberColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faTasks} /> },
});
