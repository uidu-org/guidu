import { addField } from '@uidu/data-fields';
import React from 'react';

export default ({ onFieldAdd }) => ({
  colId: 'add',
  filter: false,
  type: 'addField',
  suppressColumnsToolPanel: true,
  suppressFiltersToolPanel: true,
  lockVisible: true,
  sortable: false,
  resizable: false,
  rowDrag: false,
  editable: false,
  headerComponentFramework: ({ onFieldAdd, displayName }) => {
    return (
      <div
        className="ag-header-component d-flex align-items-center justify-content-center flex-grow-1"
        style={{ minWidth: 0 }}
        onClick={onFieldAdd}
      >
        <span style={{ opacity: 0.5 }}>{addField.icon}</span>
      </div>
    );
  },
  headerClass: 'ag-add-field-header text-center',
  cellClass: 'ag-add-field-cell',
  headerComponentParams: {
    onFieldAdd,
  },
});
