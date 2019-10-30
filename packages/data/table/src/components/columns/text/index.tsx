import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const textField = {
  id: 'text',
  name: <FormattedMessage id="field.text.name" defaultMessage="Text" />,
  icon: <FontAwesomeIcon icon={faParagraph} />,
};

export default () => ({
  type: 'text',
  field: 'text',
  filter: 'agTextColumnFilter',
  cellEditor: 'agLargeTextCellEditor',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faParagraph} /> },
});
