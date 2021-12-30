/* eslint-disable react/jsx-props-no-spreading */

import loadable from '@loadable/component';
import { CalendarToolbar } from '@uidu/data-controls';
import { ShellBodyWithSpinner } from '@uidu/shell';
import dayjs from 'dayjs';
import React from 'react';
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
    <div className="" {...props} />
  </div>
));

const ColumnHeader = ({ title, items, ...rest }) => {
  return (
    <div tw="bg-transparent flex items-center justify-between" {...rest}>
      <div>
        <span tw="mr-3">{title}</span>
        {/* <Badge>{items.length}</Badge> */}
      </div>
      {/* <div className="btn-group">
        <button className="p-2 btn btn-sm">
          <Plus size={16} />
        </button>
        <button className="p-2 btn btn-sm">
          <MoreHorizontal size={16} />
        </button>
      </div> */}
    </div>
  );
};

const Item = ({ item, provided, ...rest }) => {
  const { history } = item;
  return (
    <a
      // to={item.data.id}
      onClick={() => history.push(`/apps/calls/proposals/${item.id}`)}
      tw="block border rounded background[rgb(var(--body-on-primary-bg))] mb-3 p-4"
      ref={provided.innerRef}
      {...rest}
    >
      <DataCard item={item} {...rest} />
    </a>
  );
};

function DataManagerView({
  onItemClick,
  viewProps,
  // onSortChanged,
  // onFilterChanged,
  // onColumnVisible,
  // onDragStopped,
  // onColumnResized,
  // onRowGroupOpened,
  // onColumnRowGroupChanged,
}) {
  const {
    currentView,
    tableInstance,
    rowData,
    columns,
    columnCount,
    setAggregation,
    setColumnWidth,
  } = useDataManagerContext();
  const renderResponsiveView = ({ mobileView, desktopView }) => {
    return (
      <Media query={{ maxWidth: 768 }}>
        {(matches) => {
          if (matches) {
            return mobileView;
          }

          return desktopView;
        }}
      </Media>
    );
  };

  if (!rowData) {
    return <ShellBodyWithSpinner />;
  }

  let desktopView = null;
  let mobileView = null;

  switch (currentView.kind) {
    case 'calendar': {
      const primaryField = currentView.preferences?.primaryField || 'name';
      const startDateField =
        currentView.preferences?.startDateField || 'beginsAt';
      const endDateField =
        currentView.preferences?.startDateField || 'finishesAt';
      desktopView = mobileView = (
        <>
          <LoadableCalendar fallback={<ShellBodyWithSpinner />}>
            {({ default: Calendar }) => {
              return (
                <div tw="h-full">
                  <Calendar
                    {...viewProps.calendar}
                    onItemClick={onItemClick}
                    events={rowData}
                    startAccessor={(item) => {
                      return dayjs(item[startDateField]).toDate();
                    }}
                    titleAccessor={(item) => item[primaryField]}
                    endAccessor={(item) => {
                      return endDateField
                        ? dayjs(item[endDateField]).toDate()
                        : dayjs(item[startDateField]).add(3, 'hour').toDate();
                    }}
                    columnDefs={columns}
                    components={{
                      toolbar: CalendarToolbar,
                    }}
                  />
                </div>
              );
            }}
          </LoadableCalendar>
        </>
      );
      break;
    }
    case 'board': {
      const primaryField = currentView.preferences?.primaryField;
      desktopView = mobileView = (
        <>
          <LoadableBoard fallback={<ShellBodyWithSpinner />}>
            {({ default: Board }) => {
              if (!primaryField) {
                return null;
              }
              return (
                <Board
                  {...viewProps.board}
                  tableInstance={tableInstance}
                  columnDefs={tableInstance.visibleColumns}
                  initial={rowData.reduce((res, item, index) => {
                    const key = item[primaryField];
                    if (res[key]) {
                      res[key] = [...res[key], { ...item, content: item.id }];
                    } else {
                      res[key] = [{ ...item, content: item.id }];
                    }
                    return res;
                  }, {})}
                  onItemClick={onItemClick}
                  components={{
                    columnContainer: Column,
                    columnHeader: ColumnHeader,
                    item: Item,
                  }}
                />
              );
            }}
          </LoadableBoard>
        </>
      );
      break;
    }
    case 'gallery': {
      mobileView = (
        <>
          <LoadableList fallback={<ShellBodyWithSpinner />}>
            {({ default: List }) => (
              <List
                {...viewProps.list}
                tableInstance={tableInstance}
                onItemClick={onItemClick}
                columnDefs={columns}
              />
            )}
          </LoadableList>
        </>
      );
      desktopView = (
        <>
          <LoadableGallery fallback={<ShellBodyWithSpinner />}>
            {({ default: Gallery }) => (
              <Gallery
                {...viewProps.gallery}
                tableInstance={tableInstance}
                columnCount={columnCount}
                onItemClick={onItemClick}
                columnDefs={columns}
              />
            )}
          </LoadableGallery>
        </>
      );
      break;
    }
    case 'list':
      desktopView = mobileView = (
        <>
          <LoadableList fallback={<ShellBodyWithSpinner />}>
            {({ default: List }) => (
              <List
                {...viewProps.list}
                tableInstance={tableInstance}
                onItemClick={onItemClick}
                columnDefs={columns}
              />
            )}
          </LoadableList>
        </>
      );
      break;
    default:
      desktopView = (
        <LoadableTable fallback={<ShellBodyWithSpinner />}>
          {({ default: Table }) => (
            <div tw="h-full">
              <Table
                setAggregation={setAggregation}
                setColumnWidth={setColumnWidth}
                tableInstance={tableInstance}
                {...viewProps.table}
                rowHeight={(viewProps.table || {}).rowHeight || 56}
                onItemClick={onItemClick}
                columnDefs={columns}
                rowData={rowData}
                // onAddField={onAddField}
                // onSortChanged={onSortChanged}
                // onFilterChanged={onFilterChanged}
                // onColumnRowGroupChanged={onColumnRowGroupChanged}
                // onColumnVisible={onColumnVisible}
                // onDragStopped={onDragStopped}
                // onColumnResized={onColumnResized}
                // onRowGroupOpened={onRowGroupOpened}
              />
            </div>
          )}
        </LoadableTable>
      );
      mobileView = (
        <>
          <LoadableList fallback={<ShellBodyWithSpinner />}>
            {({ default: List }) => (
              <List
                {...viewProps.list}
                tableInstance={tableInstance}
                onItemClick={onItemClick}
                columnDefs={columns}
              />
            )}
          </LoadableList>
        </>
      );
      break;
  }

  return renderResponsiveView({
    mobileView,
    desktopView,
  });
}

export default DataManagerView;
