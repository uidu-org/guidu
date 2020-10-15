import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React from 'react';
import { ArrowRight } from 'react-feather';

export default function Header({
  column,
  state,
  setHiddenColumns,
  setSortBy,
  setGroupBy,
  autosizeAllColumns,
  setColumnWidth,
  getColumnWidth,
}) {
  const updateSortBy = (columnId: string, desc: boolean) => {
    if (state.sortBy.find((s) => s.id === columnId)) {
      // update
      return setSortBy(
        state.sortBy.map((s) => {
          if (s.id === columnId) {
            return {
              id: columnId,
              desc,
            };
          }
          return s;
        }),
      );
    }
    return setSortBy([...state.sortBy, { id: columnId, desc }]);
  };

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
          <DropdownMenu
            triggerType="button"
            position="bottom right"
            triggerButtonProps={{
              appearance: 'subtle',
            }}
          >
            <DropdownItemGroup>
              <DropdownItem
                onClick={() => setColumnWidth(column, getColumnWidth(column))}
              >
                Autosize this column
              </DropdownItem>
              <DropdownItem onClick={() => autosizeAllColumns()}>
                Autosize all columns
              </DropdownItem>
            </DropdownItemGroup>
            <DropdownItemGroup>
              {column.isSorted && (
                <DropdownItem
                  onClick={(e) =>
                    setSortBy(state.sortBy.filter((s) => s.id !== column.id))
                  }
                >
                  Unsort
                </DropdownItem>
              )}
              <DropdownItem
                isDisabled={column.isSorted && !column.isSortedDesc}
                onClick={(e) => updateSortBy(column.id, false)}
              >
                Sort A <ArrowRight size={14} /> Z
              </DropdownItem>
              <DropdownItem
                isDisabled={column.isSorted && column.isSortedDesc}
                onClick={(e) => updateSortBy(column.id, true)}
              >
                Sort Z <ArrowRight size={14} /> A
              </DropdownItem>
              {column.isGrouped ? (
                <DropdownItem
                  onClick={(e) =>
                    setGroupBy(state.groupBy.filter((g) => g !== column.id))
                  }
                >
                  Remove grouping
                </DropdownItem>
              ) : (
                <DropdownItem
                  isDisabled={!column.canGroupBy}
                  onClick={(e) => setGroupBy([...state.groupBy, column.id])}
                >
                  Group by this field
                </DropdownItem>
              )}

              {column.isVisible && (
                <DropdownItem
                  onClick={(e) =>
                    setHiddenColumns([...state.hiddenColumns, column.id])
                  }
                >
                  Hide this column
                </DropdownItem>
              )}
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
