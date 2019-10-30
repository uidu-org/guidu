import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Editor from './editor';
import Renderer from './renderer';

export const memberField = {
  id: 'member',
  name: <FormattedMessage id="field.member.name" defaultMessage="Member" />,
  icon: <FontAwesomeIcon icon={faUsers} />,
};

export default field => ({
  type: 'member',
  field: 'member',
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
