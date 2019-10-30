import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Renderer from './renderer';

export const phoneField = {
  id: 'phone',
  name: <FormattedMessage id="field.phone.name" defaultMessage="Phone" />,
  icon: <FontAwesomeIcon icon={faPhone} />,
};

export default () => ({
  type: 'phone',
  field: 'phone',
  filter: 'agTextColumnFilter',
  cellRenderer: Renderer,
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faPhone} /> },
});
