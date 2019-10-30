import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const numberField = {
  id: 'number',
  name: <FormattedMessage id="field.number.name" defaultMessage="Number" />,
  icon: <FontAwesomeIcon icon={faHashtag} />,
};

export default () => ({
  // cellEditorFramework: DatePicker,
  type: ['numericColumn', 'number'],
  field: 'number',
  filter: 'agNumberColumnFilter',
  headerComponentParams: { menuIcon: <FontAwesomeIcon icon={faHashtag} /> },
  // valueFormatter: ({ value }) => moment(value).format('L'),
});
