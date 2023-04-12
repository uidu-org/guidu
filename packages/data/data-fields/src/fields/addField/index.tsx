import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AddField: ColumnDef<unknown, string> = {
  meta: {
    kind: 'addField',
    name: (
      <FormattedMessage
        defaultMessage="Add field"
        id="uidu.data-fields.add_field.name"
      />
    ),
    icon: <FontAwesomeIcon icon={faPlus} />,
    color: 'var(--light)',
    description: (
      <FormattedMessage
        defaultMessage="Add a custom field to your model"
        id="uidu.data-fields.add_field.description"
      />
    ),
    suppressMenu: true,
    enableEditing: false,
  },
  enableColumnFilter: false,
  enableHiding: false,
  enableSorting: false,
  enableResizing: false,
  rowDrag: false,
  editable: false,
};

export default AddField;
