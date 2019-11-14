import { addField } from '@uidu/data-fields';
import Tooltip from '@uidu/tooltip';
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
      <Tooltip content={displayName} position="bottom" delay={0}>
        <div
          className="ag-header-component d-flex align-items-center justify-content-center flex-grow-1"
          style={{ minWidth: 0 }}
          onClick={onFieldAdd}
        >
          <span style={{ opacity: 0.5 }}>{addField.icon}</span>
        </div>
      </Tooltip>
    );
  },
  headerClass: 'ag-add-field-header text-center',
  cellClass: 'ag-add-field-cell',
  headerComponentParams: {
    onFieldAdd,
  },
});
