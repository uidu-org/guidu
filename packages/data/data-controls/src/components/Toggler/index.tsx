import Button, { ButtonGroup } from '@uidu/button';
import { CheckboxStateless } from '@uidu/checkbox';
import { useDataManagerContext } from '@uidu/data-manager';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useIntl } from 'react-intl';
import { TogglerProps } from './types';

export default function TogglerForm<T>(props: TogglerProps) {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(true);

  const {
    tableInstance: {
      getState,
      getAllLeafColumns,
      getIsAllColumnsVisible,
      setColumnVisibility,
    },
  } = useDataManagerContext();
  const { columnVisibility } = getState();
  const columns = getAllLeafColumns();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    props.onDragEnd({
      name: result.draggableId,
      oldIndex: result.source.index,
      newIndex: result.destination.index,
    });
  };

  return (
    <div tw="flow-root">
      <div tw="py-3">
        <AnimateHeight height={isOpen ? 'auto' : 0}>
          {columns.map((column) => (
            <div key={column.id} tw="px-3 xl:px-4 border-0 py-2 block relative">
              <button
                type="button"
                tw="absolute inset-0"
                onClick={(e) => {
                  e.preventDefault();
                  column.toggleVisibility(!column.getIsVisible());
                }}
              />
              <div tw="flex items-center justify-between">
                <span tw="mr-2">
                  <CheckboxStateless checked={column.getIsVisible()} />
                </span>
                <div tw="truncate flex-grow">{column.columnDef.meta?.name}</div>
              </div>
            </div>
          ))}
        </AnimateHeight>
      </div>
      <div tw="px-3 xl:px-4 border-t py-3">
        <ButtonGroup tw="block w-full">
          <Button
            shouldFitContainer
            onClick={(e) => {
              e.preventDefault();
              const columnIds = columns.map((column) => column.id);
              if (getIsAllColumnsVisible()) {
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
            {getIsAllColumnsVisible()
              ? intl.formatMessage({
                  defaultMessage: 'Deselect all',
                  id: 'uidu.data-controls.toggler.deselect_all',
                })
              : intl.formatMessage({
                  defaultMessage: 'Select all',
                  id: 'uidu.data-controls.toggler.select_all',
                })}
          </Button>
          {/* <Button
                shouldFitContainer
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Toggle group' })}
              </Button> */}
        </ButtonGroup>
      </div>
    </div>
  );
}
