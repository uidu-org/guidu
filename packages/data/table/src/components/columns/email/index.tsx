import { faFont } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const EmailRenderer = ({ value }) => <a href="#">{value}</a>;

export default () => ({
  filter: 'agTextColumnFilter',
  cellRendererFramework: EmailRenderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faFont} /> },
});
