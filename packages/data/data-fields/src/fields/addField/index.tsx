import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from '../../types';

const AddField: Partial<Field> = {
  kind: 'addField',
  name: <FormattedMessage defaultMessage="Add field" />,
  icon: <FontAwesomeIcon icon={faPlus} />,
  color: 'var(--light)',
  description: (
    <FormattedMessage defaultMessage="Add a custom field to your model" />
  ),
  filter: false,
  canHide: false,
  sortable: false,
  resizable: false,
  rowDrag: false,
  editable: false,
  headerClass: 'ag-add-field-header text-center',
  cellClass: 'ag-add-field-cell',
};

export default AddField;
