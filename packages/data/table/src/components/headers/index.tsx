import { ChevronDownIcon } from '@heroicons/react/solid';
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
  state,
  setHiddenColumns,
  setSortBy,
  setGroupBy,
  autosizeAllColumns,
  setColumnWidth,
  getColumnWidth,
  headerIcons,
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateSortBy = useCallback(
    (columnId: string, desc: boolean) => {
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
    },
    [state, setSortBy],
  );

  const Content = useCallback(
    () => (
      <MenuGroup>
        {column.canEdit && (
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
        <Section hasSeparator>
          <ButtonItem
            onClick={() => {
              setIsOpen(false);
              setColumnWidth(column, getColumnWidth(column));
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
        <Section>
          {column.isSorted && (
            <ButtonItem
              onClick={(e) => {
                setIsOpen(false);
                setSortBy(state.sortBy.filter((s) => s.id !== column.id));
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
            isDisabled={column.isSorted && !column.isSortedDesc}
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
            isDisabled={column.isSorted && column.isSortedDesc}
            onClick={(e) => {
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
          {column.canFilter && (
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
          {column.canGroupBy && (
            <>
              {column.isGrouped ? (
                <ButtonItem
                  onClick={() => {
                    setIsOpen(false);
                    setGroupBy(state.groupBy.filter((g) => g !== column.id));
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
                    setGroupBy([...state.groupBy, column.id]);
                  }}
                  iconBefore={<Server size={14} />}
                >
                  <FormattedMessage
                    defaultMessage="Group by this field"
                    id="uidu.table.header.add_grouping"
                  />
                </ButtonItem>
              )}
            </>
          )}
          {column.canHide && (
            <ButtonItem
              onClick={(e) => {
                setIsOpen(false);
                setHiddenColumns([...state.hiddenColumns, column.id]);
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
    ),
    [
      column,
      getColumnWidth,
      setColumnWidth,
      state,
      setHiddenColumns,
      setGroupBy,
      setSortBy,
      updateSortBy,
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
        {headerIcons && column?.icon && (
          <span tw="mr-3 color[rgb(var(--body-secondary-color))] opacity-40">
            {column.icon}
          </span>
        )}
        {column.name}
      </div>
      {!column.suppressMenu && (
        <div tw="ml-4 font-weight[initial]">
          <Popup
            isOpen={isOpen}
            placement="bottom-end"
            rootBoundary="document"
            onClose={() => setIsOpen(false)}
            content={Content}
            trigger={Trigger}
          />
        </div>
      )}
    </div>
  );
}
