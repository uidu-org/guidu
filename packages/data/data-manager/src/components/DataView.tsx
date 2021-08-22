/* eslint-disable react/jsx-props-no-spreading */

import loadable from '@loadable/component';
import { CalendarToolbar } from '@uidu/data-controls';
import { ShellBodyWithSpinner } from '@uidu/shell';
import dayjs from 'dayjs';
import React, { PureComponent } from 'react';
import Media from 'react-media';
import DataCard from './DataCard';

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
        <button className="btn btn-sm p-2">
          <Plus size={16} />
        </button>
        <button className="btn btn-sm p-2">
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
      tw="border rounded background[rgb(var(--body-on-primary-bg))] mb-3"
      ref={provided.innerRef}
      {...rest}
    >
      <DataCard item={item} {...rest} />
    </a>
  );
};

export default class DataView extends PureComponent<any> {
  renderResponsiveView = ({ mobileView, desktopView }) => {
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

  render() {
    const {
      viewProps = {
        board: {},
        calendar: {},
        gallery: {},
        list: {},
        table: {},
      },
      rowData,
      onItemClick,
      currentView,
      onAddField,
      data,
      columns,
      rowHeight,
      columnCount,
      onSortChanged,
      onFilterChanged,
      onColumnVisible,
      onDragStopped,
      onColumnResized,
      onRowGroupOpened,
      onColumnRowGroupChanged,
      primaryField,
      startDateField,
      endDateField,
      tableInstance,
      setAggregation,
      setColumnWidth,
    } = this.props;

    if (!rowData) {
      return <ShellBodyWithSpinner />;
    }

    let desktopView = null;
    let mobileView = null;

    switch (currentView.kind) {
      case 'calendar':
        desktopView = mobileView = (
          <>
            <LoadableCalendar fallback={<ShellBodyWithSpinner />}>
              {({ default: Calendar }) => {
                return (
                  <div tw="h-full">
                    <Calendar
                      {...viewProps.calendar}
                      onItemClick={onItemClick}
                      events={data}
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
      case 'board':
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
      case 'gallery':
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
                  rowHeight={(viewProps.table || {}).rowHeight || rowHeight}
                  onItemClick={onItemClick}
                  columnDefs={columns}
                  rowData={rowData}
                  onAddField={onAddField}
                  onSortChanged={onSortChanged}
                  onFilterChanged={onFilterChanged}
                  onColumnRowGroupChanged={onColumnRowGroupChanged}
                  onColumnVisible={onColumnVisible}
                  onDragStopped={onDragStopped}
                  onColumnResized={onColumnResized}
                  onRowGroupOpened={onRowGroupOpened}
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

    return this.renderResponsiveView({
      mobileView,
      desktopView,
    });
  }
}
