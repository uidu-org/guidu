import { CheckboxStateless } from '@uidu/checkbox';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { FormattedMessage } from 'react-intl';

export default function ColumnGroup({
  columnGroupObj,
  columns,
  checkedColumnsCount,
  isGroupChecked,
  tableInstance,
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="list-group list-group-flush mb-3">
      <li className="list-group-item px-3 px-xl-4 border-0 py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-truncate flex-grow-1 text-muted text-uppercase small">
            {columnGroupObj.name} ({checkedColumnsCount}/{columns.length})
          </div>
          <div className="small">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const columnIds = columns.map((column) => column.id);
                if (isGroupChecked) {
                  return tableInstance.setHiddenColumns(columnIds);
                }
                return tableInstance.setHiddenColumns(
                  tableInstance.state.hiddenColumns.filter(
                    (c) => !columnIds.includes(c),
                  ),
                );
              }}
            >
              {isGroupChecked ? (
                <FormattedMessage
                  defaultMessage="Deselect all"
                  id="data_controls.toggler.deselect_all"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Select all"
                  id="data_controls.toggler.select_all"
                />
              )}
            </a>{' '}
            &middot;{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              Toggle group
            </a>
          </div>
        </div>
      </li>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        {columns.map((column, index) => (
          <a
            href="#"
            key={column.id}
            className="list-group-item list-group-item-action px-3 px-xl-4 border-0 py-2"
            onClick={(e) => {
              e.preventDefault();
              column.toggleHidden(!!column.isVisible);
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <span className="mr-1">
                <CheckboxStateless checked={column.isVisible} />
              </span>
              <div className="text-truncate flex-grow-1">{column.name}</div>
            </div>
          </a>
        ))}
      </AnimateHeight>
    </div>
  );
}
