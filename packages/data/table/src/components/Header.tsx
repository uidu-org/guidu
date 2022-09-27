import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { HeaderContext } from '@tanstack/react-table';
import Button from '@uidu/button';
import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useCallback, useState } from 'react';
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
  table,
  header,
  autosizeAllColumns,
  setColumnWidth,
  getColumnWidth,
  headerIcons = true,
}: HeaderContext<any, unknown>) {
  const { setColumnVisibility, setSorting, setGrouping, getState } = table;
  const state = getState();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateSortBy = useCallback(
    (columnId: string, desc: boolean) => {
      if (state.sorting.find((s) => s.id === columnId)) {
        // update
        return setSorting(
          state.sorting.map((s) => {
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
      return setSorting([...state.sorting, { id: columnId, desc }]);
    },
    [state, setSorting],
  );

  const Content = useCallback(
    () => (
      <div style={{ width: column.getSize() }}>
        <MenuGroup>
          {column.columnDef.canEdit && (
            <Section hasSeparator>
              <ButtonItem
                onClick={() => console.log('Edit field')}
                iconBefore={<Edit2 size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Edit this column"
                  id="uidu.table.header.edit"
                />
              </ButtonItem>
            </Section>
          )}
          {false && header.column.columnDef.enableResizing && (
            <Section hasSeparator>
              <ButtonItem
                onClick={() => {
                  setIsOpen(false);
                  // setColumnWidth(column, getColumnWidth(column));
                }}
                iconBefore={<AlignJustify size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Autosize this column"
                  id="uidu.table.header.autosize"
                />
              </ButtonItem>
              {/* <ButtonItem onClick={() => autosizeAllColumns()}>
                Autosize all columns
              </ButtonItem> */}
            </Section>
          )}
          <Section>
            {column.getIsSorted() && (
              <ButtonItem
                onClick={(e) => {
                  setIsOpen(false);
                  setSorting(state.sorting.filter((s) => s.id !== column.id));
                }}
                iconBefore={<ArrowRight size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Unsort"
                  id="uidu.table.header.unsort"
                />
              </ButtonItem>
            )}
            <ButtonItem
              isDisabled={column.getIsSorted() && !column.getFirstSortDir()}
              onClick={(e) => {
                setIsOpen(false);
                updateSortBy(column.id, false);
              }}
              iconBefore={<ArrowDownRight size={14} />}
            >
              <span tw="flex items-center">
                <FormattedMessage
                  defaultMessage="Sort A {icon} Z"
                  values={{ icon: <ArrowRight tw="mx-1" size={14} /> }}
                  id="uidu.table.header.sort_a_z"
                />
              </span>
            </ButtonItem>
            <ButtonItem
              isDisabled={
                column.getIsSorted() && column.getFirstSortDir() === 'desc'
              }
              onClick={() => {
                setIsOpen(false);
                updateSortBy(column.id, true);
              }}
              iconBefore={<ArrowUpRight size={14} />}
            >
              <span tw="flex items-center">
                <FormattedMessage
                  defaultMessage="Sort Z {icon} A"
                  values={{ icon: <ArrowRight tw="mx-1" size={14} /> }}
                  id="uidu.table.header.sort_z_a"
                />
              </span>
            </ButtonItem>
            {column.getCanFilter() && (
              <ButtonItem
                onClick={() => console.log('Add filter')}
                iconBefore={<Filter size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Add filter"
                  id="uidu.table.header.add_filter"
                />
              </ButtonItem>
            )}
            {column.getCanGroup() &&
              (column.getIsGrouped() ? (
                <ButtonItem
                  onClick={() => {
                    setIsOpen(false);
                    setGrouping(state.grouping.filter((g) => g !== column.id));
                  }}
                  iconBefore={<Server size={14} />}
                >
                  <FormattedMessage
                    defaultMessage="Remove grouping"
                    id="uidu.table.header.remove_grouping"
                  />
                </ButtonItem>
              ) : (
                <ButtonItem
                  onClick={() => {
                    setIsOpen(false);
                    setGrouping([...state.grouping, column.id]);
                  }}
                  iconBefore={<Server size={14} />}
                >
                  <FormattedMessage
                    defaultMessage="Group by this field"
                    id="uidu.table.header.add_grouping"
                  />
                </ButtonItem>
              ))}
            {column.columnDef.enableHiding && (
              <ButtonItem
                onClick={(e) => {
                  setIsOpen(false);
                  setColumnVisibility({
                    ...state.columnVisibility,
                    [column.id]: false,
                  });
                }}
                iconBefore={<EyeOff size={14} />}
              >
                <FormattedMessage
                  defaultMessage="Hide this column"
                  id="uidu.table.header.hide"
                />
              </ButtonItem>
            )}
          </Section>
        </MenuGroup>
      </div>
    ),
    [
      column,
      state,
      setColumnVisibility,
      setGrouping,
      setSorting,
      updateSortBy,
      header.column.columnDef.enableResizing,
    ],
  );

  const Trigger = useCallback(
    (triggerProps) => (
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        appearance="subtle"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prevIsOpen) => !prevIsOpen);
        }}
        iconBefore={<ChevronDownIcon tw="h-4 w-4" />}
      />
    ),
    [],
  );

  return (
    <div
      tw="flex items-center justify-center flex-grow min-w-0 cursor-default"
      onDoubleClick={() => setIsOpen(true)}
    >
      <div tw="flex-grow truncate">
        {headerIcons && column?.columnDef.meta?.icon && (
          <span tw="mr-3 color[rgb(var(--body-secondary-color))] opacity-40">
            {column.columnDef.meta?.icon}
          </span>
        )}
        {column.columnDef.meta?.name}
      </div>
      {!column.columnDef.meta?.suppressMenu && (
        <div tw="ml-4 font-weight[initial]">
          <Popup
            isOpen={isOpen}
            placement="bottom-end"
            rootBoundary="document"
            onClose={() => setIsOpen(false)}
            offset={[16, 8]}
            content={Content}
            trigger={Trigger}
          />
        </div>
      )}
    </div>
  );
}
