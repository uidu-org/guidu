import { Column, HeaderGroup, Table } from '@tanstack/react-table';
import Button, { ButtonGroup } from '@uidu/button';
import { CheckboxStateless } from '@uidu/checkbox';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useIntl } from 'react-intl';

export default function ColumnGroup<T>({
  columns,
  columnGroupObj,
  checkedColumnsCount,
  tableInstance,
}: {
  columns: Column<T, unknown>[];
  columnGroupObj: HeaderGroup<T>;
  tableInstance: Table<T>;
}) {
  console.log(columnGroupObj);
  const intl = useIntl();
  const { headers } = columnGroupObj;

  const [isOpen, setIsOpen] = useState(true);
  const { setColumnVisibility, getState } = tableInstance;

  const { columnVisibility } = getState();

  const isGroupChecked = headers.every((header) =>
    header.column.getIsVisible(),
  );

  return (
    <div tw="flow-root mb-3">
      <div tw="px-3 xl:px-4 border-0 py-2">
        <div tw="flex items-center justify-between">
          <div tw="truncate flex-grow text-gray-500 uppercase text-sm">
            {columnGroupObj.id} ({checkedColumnsCount}/{headers.length})
          </div>
          <div tw="text-sm">
            <ButtonGroup>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  const columnIds = headers.map((header) => header.id);
                  if (isGroupChecked) {
                    return setColumnVisibility(
                      columnIds.reduce(
                        (obj, item) => ({
                          ...obj,
                          [item]: false,
                        }),
                        columnVisibility,
                      ),
                    );
                  }
                  return setColumnVisibility(
                    columnIds.reduce(
                      (obj, item) => ({
                        ...obj,
                        [item]: true,
                      }),
                      columnVisibility,
                    ),
                  );
                }}
              >
                {isGroupChecked
                  ? intl.formatMessage({
                      defaultMessage: 'Deselect all',
                      id: 'uidu.data-controls.toggler.deselect_all',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Select all',
                      id: 'uidu.data-controls.toggler.select_all',
                    })}
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Toggle group' })}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        {headers.map((header) => (
          <div key={header.id} tw="px-3 xl:px-4 border-0 py-2 block relative">
            <button
              type="button"
              tw="absolute inset-0"
              onClick={(e) => {
                e.preventDefault();
                header.column.toggleVisibility(!header.column.getIsVisible());
              }}
            />
            <div tw="flex items-center justify-between">
              <span tw="mr-2">
                <CheckboxStateless checked={header.column.getIsVisible()} />
              </span>
              <div tw="truncate flex-grow">
                {header.column.columnDef.meta?.name}
              </div>
            </div>
          </div>
        ))}
      </AnimateHeight>
    </div>
  );
}
