import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React from 'react';
import {
  AlignJustify,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Edit2,
  EyeOff,
  Filter,
  Server,
} from 'react-feather';
import { FormattedMessage } from 'react-intl';

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
      className="d-flex align-items-center justify-content-center flex-grow-1"
      style={{ minWidth: 0 }}
    >
      <div className="customHeaderLabel flex-grow-1 text-truncate">
        {column?.icon && (
          <span className="mr-2 text-muted" style={{ opacity: 0.4 }}>
            {column.icon}
          </span>
        )}
        {column.name}
      </div>
      {!column.suppressMenu && (
        <div className="ml-3" style={{ fontWeight: 'initial' }}>
          <DropdownMenu
            triggerType="button"
            position="bottom right"
            triggerButtonProps={{
              appearance: 'subtle',
            }}
          >
            {column.canEdit && (
              <DropdownItemGroup>
                <DropdownItem
                  onClick={() => console.log('Edit field')}
                  elemBefore={<Edit2 size={14} />}
                >
                  <FormattedMessage defaultMessage="Edit this column" />
                </DropdownItem>
              </DropdownItemGroup>
            )}
            <DropdownItemGroup>
              <DropdownItem
                onClick={() => setColumnWidth(column, getColumnWidth(column))}
                elemBefore={<AlignJustify size={14} />}
              >
                <FormattedMessage defaultMessage="Autosize this column" />
              </DropdownItem>
              {/* <DropdownItem onClick={() => autosizeAllColumns()}>
                Autosize all columns
              </DropdownItem> */}
            </DropdownItemGroup>
            <DropdownItemGroup>
              {column.isSorted && (
                <DropdownItem
                  onClick={(e) =>
                    setSortBy(state.sortBy.filter((s) => s.id !== column.id))
                  }
                  elemBefore={<ArrowRight size={14} />}
                >
                  <FormattedMessage defaultMessage="Unsort" />
                </DropdownItem>
              )}
              <DropdownItem
                isDisabled={column.isSorted && !column.isSortedDesc}
                onClick={(e) => updateSortBy(column.id, false)}
                elemBefore={<ArrowDownRight size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Sort A {icon} Z"
                  values={{ icon: () => <ArrowRight size={14} /> }}
                />
              </DropdownItem>
              <DropdownItem
                isDisabled={column.isSorted && column.isSortedDesc}
                onClick={(e) => updateSortBy(column.id, true)}
                elemBefore={<ArrowUpRight size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Sort Z {icon} A"
                  values={{ icon: () => <ArrowRight size={14} /> }}
                />
              </DropdownItem>
              {column.canFilter && (
                <DropdownItem
                  onClick={() => console.log('Add filter')}
                  elemBefore={<Filter size={14} />}
                >
                  <FormattedMessage defaultMessage="Add filter" />
                </DropdownItem>
              )}
              {column.canGroupBy && (
                <>
                  {column.isGrouped ? (
                    <DropdownItem
                      onClick={() =>
                        setGroupBy(state.groupBy.filter((g) => g !== column.id))
                      }
                      elemBefore={<Server size={14} />}
                    >
                      <FormattedMessage defaultMessage="Remove grouping" />
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => setGroupBy([...state.groupBy, column.id])}
                      elemBefore={<Server size={14} />}
                    >
                      <FormattedMessage defaultMessage="Group by this field" />
                    </DropdownItem>
                  )}
                </>
              )}
              {column.canHide && (
                <DropdownItem
                  onClick={(e) =>
                    setHiddenColumns([...state.hiddenColumns, column.id])
                  }
                  elemBefore={<EyeOff size={14} />}
                >
                  <FormattedMessage defaultMessage="Hide this column" />
                </DropdownItem>
              )}
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
