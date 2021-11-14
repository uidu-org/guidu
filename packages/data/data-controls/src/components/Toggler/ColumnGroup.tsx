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
    <div tw="flow-root mb-3">
      <div tw="px-3 xl:px-4 border-0 py-2">
        <div tw="flex items-center justify-between">
          <div tw="truncate flex-grow text-gray-500 uppercase text-sm">
            {columnGroupObj.name} ({checkedColumnsCount}/{columns.length})
          </div>
          <div tw="text-sm">
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
      </div>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        {columns.map((column, index) => (
          <a
            href="#"
            key={column.id}
            tw="px-3 xl:px-4 border-0 py-2 block"
            onClick={(e) => {
              e.preventDefault();
              column.toggleHidden(!!column.isVisible);
            }}
          >
            <div tw="flex items-center justify-between">
              <span tw="mr-2">
                <CheckboxStateless checked={column.isVisible} />
              </span>
              <div tw="truncate flex-grow">{column.name}</div>
            </div>
          </a>
        ))}
      </AnimateHeight>
    </div>
  );
}
