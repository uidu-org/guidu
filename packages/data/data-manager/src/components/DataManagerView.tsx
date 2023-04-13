/* eslint-disable react/jsx-props-no-spreading */
import loadable from '@loadable/component';
import { Row } from '@tanstack/react-table';
import { GalleryProps } from '@uidu/gallery';
import { ListProps, OverrideableListProps } from '@uidu/list';
import { ShellBodyWithSpinner } from '@uidu/shell';
import { OverrideableTableProps, TableProps } from '@uidu/table';
import dayjs from 'dayjs';
import React, { FC, ReactNode, Suspense } from 'react';
import Media from 'react-media';
import DataCard from './DataCard';
import { useDataManagerContext } from './DataManagerContext';

const LoadableTable = (loadable as any).lib(() => import('@uidu/table'));
const LoadableBoard = (loadable as any).lib(() => import('@uidu/board'));
const LoadableCalendar = (loadable as any).lib(() => import('@uidu/calendar'));
const LoadableGallery = (loadable as any).lib(() => import('@uidu/gallery'));
const LoadableList = (loadable as any).lib(() => import('@uidu/list'));

const Column = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref}>
    <div tw="" {...props} />
  </div>
));

function ColumnHeader({ title, items, ...rest }) {
  return (
    <div tw="bg-transparent flex items-center justify-between" {...rest}>
      <div>
        <span tw="mr-3">{title}</span>
        {/* <Badge>{items.length}</Badge> */}
      </div>
      {/* <div tw="btn-group">
        <button tw="p-2 btn btn-sm">
          <Plus size={16} />
        </button>
        <button tw="p-2 btn btn-sm">
          <MoreHorizontal size={16} />
        </button>
      </div> */}
    </div>
  );
}

function Item({ item, provided, ...rest }) {
  return (
    <a
      tw="block border rounded [background:rgb(var(--body-on-primary-bg))] mb-3 p-4"
      ref={provided.innerRef}
      {...rest}
    >
      <DataCard item={item} {...rest} />
    </a>
  );
}

function DefaultEmptyState() {
  return (
    <div tw="text-center h-full flex flex-col justify-center">
      <svg
        tw="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 tw="mt-2 text-sm font-medium text-gray-900">No projects</h3>
      <p tw="mt-1 text-sm text-gray-500">
        Get started by creating a new project.
      </p>
      <div tw="mt-6">
        <button
          type="button"
          tw="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Project
        </button>
      </div>
    </div>
  );
}

export interface DataManagerTableViewProps<T>
  extends OverrideableTableProps<T> {}
export interface DataManagerListViewProps<T> extends OverrideableListProps<T> {}

export type DataManagerViewProps<T> = {
  list: DataManagerListViewProps<T>;
  table: DataManagerTableViewProps<T>;
};

function DataManagerView<T>({
  viewProps,
  emptyState: EmptyState = DefaultEmptyState,
  isPending = false,
}: {
  viewProps?: {
    board?: any;
    calendar?: any;
    gallery?: any;
    list?: DataManagerListViewProps<T>;
    table?: DataManagerTableViewProps<T>;
  };
  emptyState?: React.FC<any>;
  isPending?: boolean;
}) {
  const {
    currentView,
    tableInstance,
    columnCount,
    // setAggregation,
    // setColumnWidth,
    pagination,
    onItemClick,
  } = useDataManagerContext<T>();
  const renderResponsiveView = ({
    mobileView,
    desktopView,
  }: {
    mobileView: ReactNode;
    desktopView: ReactNode;
  }) => (
    <Media query={{ maxWidth: 768 }}>
      {(matches) => {
        if (matches) {
          return mobileView;
        }

        return desktopView;
      }}
    </Media>
  );

  let desktopView: React.ReactNode = null;
  let mobileView: React.ReactNode = null;

  const rowData = tableInstance
    .getRowModel()
    .rows.map((row) => row.original as T);

  switch (currentView?.kind) {
    case 'calendar': {
      const primaryField = currentView.preferences?.primaryField || 'name';
      const startDateField =
        currentView.preferences?.startDateField || 'beginsAt';
      const endDateField =
        currentView.preferences?.startDateField || 'finishesAt';
      const { components: calendarComponents, ...calendarViewProps } =
        viewProps.calendar || {};

      // eslint-disable-next-line no-multi-assign
      desktopView = mobileView = (
        <LoadableCalendar fallback={<ShellBodyWithSpinner />}>
          {({ default: Calendar, Toolbar }) => (
            <div tw="h-full">
              <Calendar
                onSelectEvent={onItemClick}
                events={tableInstance
                  .getRowModel()
                  .rows.map((row) => row.original)}
                startAccessor={(item: Row<T>) =>
                  dayjs(item[startDateField]).toDate()
                }
                titleAccessor={(item: Row<T>) => item[primaryField]}
                endAccessor={(item: Row<T>) =>
                  endDateField
                    ? dayjs(item[endDateField]).toDate()
                    : dayjs(item[startDateField]).add(3, 'hour').toDate()
                }
                columnDefs={tableInstance.getAllColumns()}
                components={{
                  toolbar: Toolbar,
                  ...calendarComponents,
                }}
                isPending={isPending}
                {...calendarViewProps}
              />
            </div>
          )}
        </LoadableCalendar>
      );
      break;
    }
    case 'board': {
      const primaryField = currentView.preferences?.primaryField;
      // eslint-disable-next-line no-multi-assign
      desktopView = mobileView = (
        <LoadableBoard fallback={<ShellBodyWithSpinner />}>
          {({ default: Board }) => {
            if (!primaryField) {
              return null;
            }
            const initial = rowData.reduce((res, item) => {
              const key = item[primaryField];
              if (res[key]) {
                res[key] = [...res[key], { ...item, content: item.id }];
              } else {
                res[key] = [{ ...item, content: item.id }];
              }
              return res;
            }, {});
            return (
              <Board
                isPending={isPending}
                columns={Object.keys(initial).map((key) => ({
                  id: key,
                  name: key,
                }))}
                itemsMap={initial}
                onItemClick={onItemClick}
                components={{
                  columnContainer: Column,
                  columnHeader: ColumnHeader,
                  item: Item,
                }}
                {...viewProps.board}
              />
            );
          }}
        </LoadableBoard>
      );
      break;
    }
    case 'gallery': {
      mobileView = (
        <LoadableList fallback={<ShellBodyWithSpinner />}>
          {({ default: List }: { default: FC<ListProps<T>> }) => (
            <List
              {...viewProps.list}
              tableInstance={tableInstance}
              onItemClick={onItemClick}
              isPending={isPending}
            />
          )}
        </LoadableList>
      );
      desktopView = (
        <LoadableGallery fallback={<ShellBodyWithSpinner />}>
          {({ default: Gallery }: { default: FC<GalleryProps<T>> }) => (
            <Gallery
              {...viewProps.gallery}
              tableInstance={tableInstance}
              columnCount={columnCount}
              onItemClick={onItemClick}
              isPending={isPending}
            />
          )}
        </LoadableGallery>
      );
      break;
    }
    case 'list':
      // eslint-disable-next-line no-multi-assign
      desktopView = mobileView = (
        <LoadableList fallback={<ShellBodyWithSpinner />}>
          {({ default: List }: { default: FC<ListProps<T>> }) => (
            <List
              {...viewProps.list}
              tableInstance={tableInstance}
              onItemClick={onItemClick}
              pagination={pagination}
              isPending={isPending}
            />
          )}
        </LoadableList>
      );
      break;
    default:
      desktopView = (
        <Suspense fallback={<ShellBodyWithSpinner />}>
          <LoadableTable fallback={<ShellBodyWithSpinner />}>
            {({ default: Table }: { default: FC<TableProps<T>> }) => (
              <Table
                // setAggregation={setAggregation}
                // setColumnWidth={setColumnWidth}
                rowHeight={(viewProps.table || {}).rowHeight || 56}
                onItemClick={onItemClick}
                pagination={pagination}
                tableInstance={tableInstance}
                isPending={isPending}
                {...viewProps.table}
              />
            )}
          </LoadableTable>
        </Suspense>
      );
      mobileView = (
        <LoadableList fallback={<ShellBodyWithSpinner />}>
          {({ default: List }: { default: FC<ListProps<T>> }) => (
            <List
              {...viewProps.list}
              tableInstance={tableInstance}
              onItemClick={onItemClick}
              isPending={isPending}
            />
          )}
        </LoadableList>
      );
      break;
  }

  return renderResponsiveView({
    mobileView,
    desktopView,
  });
}

export default DataManagerView;
