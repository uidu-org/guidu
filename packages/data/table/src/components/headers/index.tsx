import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React from 'react';

export default function Header({
  column,
  setHiddenColumns,
  setSortBy,
  state,
  setGroupBy,
}) {
  return (
    <div
      className="ag-header-component d-flex align-items-center justify-content-center flex-grow-1"
      style={{ minWidth: 0 }}
    >
      <div className="customHeaderLabel flex-grow-1 text-truncate">
        {column?.headerComponentParams?.menuIcon && (
          <span className="mr-2 text-muted" style={{ opacity: 0.4 }}>
            {column.headerComponentParams.menuIcon}
          </span>
        )}
        {column.headerName}
      </div>
      {!column.suppressMenu && (
        <div className="ml-3">
          <DropdownMenu triggerType="button" position="bottom right">
            <DropdownItemGroup>
              <DropdownItem onClick={console.log}>
                Autosize this column
              </DropdownItem>
              <DropdownItem onClick={console.log}>
                Autosize all columns
              </DropdownItem>
              <DropdownItem
                onClick={(e) =>
                  setSortBy([...state.sortBy, { id: column.id, desc: false }])
                }
              >
                Sort First-Last
              </DropdownItem>
              <DropdownItem
                onClick={(e) =>
                  setSortBy([...state.sortBy, { id: column.id, desc: true }])
                }
              >
                Sort Last-First
              </DropdownItem>
              <DropdownItem
                onClick={(e) => setGroupBy([...state.groupBy, column.id])}
              >
                Group by this field
              </DropdownItem>
              <DropdownItem
                onClick={(e) =>
                  setHiddenColumns([...state.hiddenColumns, column.id])
                }
              >
                Hide this column
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
