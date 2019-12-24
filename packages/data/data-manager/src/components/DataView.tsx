import loadable from '@loadable/component';
import { CalendarToolbar } from '@uidu/data-controls';
import { ShellBodyWithSpinner } from '@uidu/shell';
import Spinner from '@uidu/spinner';
import Table from '@uidu/table';
import moment from 'moment';
import React, { PureComponent } from 'react';
import Media from 'react-media';
import DataCard from './DataCard';

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
    <div
      className="card-header px-0 bg-transparent border-bottom-0 d-flex align-items-center justify-content-between"
      {...rest}
    >
      <div>
        <span className="mr-2">{title}</span>
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
      onClick={() => history.push(`/apps/calls/proposals/${item.data.id}`)}
      className="card bg-white mb-2"
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
        {matches => {
          if (matches) {
            return mobileView;
          }

          return desktopView;
        }}
      </Media>
    );
  };

  componentWillUnmount() {
    const { gridApi } = this.props;
    gridApi && gridApi.destroy();
  }

  render() {
    const {
      viewProps = {
        board: {},
        calendar: {},
        gallery: {},
        list: {},
        table: {},
      },
      columnDefs,
      onGridReady,
      rowData,
      onItemClick,
      currentView,
      onFirstDataRendered,
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
      sorters,
      groupers,
      filterModel,
      primaryField,
      startDateField,
      endDateField,
    } = this.props;

    if (!rowData) {
      return <ShellBodyWithSpinner />;
    }

    const table = (
      <Table
        rowDoubleClicked={() => null}
        rowSelection="multiple"
        suppressRowClickSelection
        // stopEditingWhenGridLosesFocus
        {...viewProps.table}
        rowHeight={(viewProps.table || {}).rowHeight || rowHeight}
        onGridReady={onGridReady}
        onFirstDataRendered={onFirstDataRendered}
        // use columnDefs from props to avoid flickering on toggling/reordering columns
        columnDefs={columnDefs}
        loadingOverlayComponentFramework={() => (
          <div className="h-100 bg-white d-flex align-items-center justify-content-center w-100">
            <Spinner />
          </div>
        )}
        rowData={rowData}
        onAddField={onAddField}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        onColumnRowGroupChanged={onColumnRowGroupChanged}
        onColumnVisible={onColumnVisible}
        onDragStopped={onDragStopped}
        onColumnResized={onColumnResized}
        onRowGroupOpened={onRowGroupOpened}
        // onRowClicked={onItemClick}
        accentedSort
        suppressPropertyNamesCheck
        enableRangeSelection
        statusBar={{
          statusPanels: [
            {
              statusPanel: 'agTotalAndFilteredRowCountComponent',
              align: 'left',
            },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' },
          ],
        }}
      />
    );

    let desktopView = null;
    let mobileView = null;

    switch (currentView.kind) {
      case 'calendar':
        desktopView = mobileView = (
          <>
            <LoadableCalendar fallback={<ShellBodyWithSpinner />}>
              {({ default: Calendar }) => {
                return (
                  <Calendar
                    {...viewProps.calendar}
                    onItemClick={onItemClick}
                    events={data.map(datum => datum.data)}
                    startAccessor={item =>
                      moment(item[startDateField]).toDate()
                    }
                    titleAccessor={item => item.email}
                    endAccessor={item =>
                      endDateField
                        ? moment(item[endDateField].toDate())
                        : moment(item[startDateField])
                            .add(3, 'hour')
                            .toDate()
                    }
                    columnDefs={columns}
                    components={{
                      toolbar: CalendarToolbar,
                    }}
                  />
                );
              }}
            </LoadableCalendar>
            <div className="d-none">{table}</div>
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
                    columnDefs={columns}
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
            <div className="d-none">{table}</div>
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
                  onItemClick={onItemClick}
                  rowData={data.map(datum => ({
                    data: datum.data,
                  }))}
                  columnDefs={columns}
                />
              )}
            </LoadableList>
            <div className="d-none">{table}</div>
          </>
        );
        desktopView = (
          <>
            <LoadableGallery fallback={<ShellBodyWithSpinner />}>
              {({ default: Gallery }) => (
                <Gallery
                  {...viewProps.gallery}
                  columnCount={columnCount}
                  onItemClick={onItemClick}
                  rowData={data.map(datum => ({
                    data: datum.data,
                  }))}
                  columnDefs={columns}
                  sorters={sorters}
                  filterModel={filterModel || {}}
                />
              )}
            </LoadableGallery>
            <div className="d-none">{table}</div>
          </>
        );
        break;
      // case 'list':
      //   desktopView = mobileView = (
      //     <>
      //       <LoadableList fallback={<ShellBodyWithSpinner />}>
      //         {({ default: List }) => (
      //           <List
      //             {...viewProps.list}
      //             onItemClick={onItemClick}
      //             rowData={data.map(datum => ({
      //               data: datum.data,
      //             }))}
      //             columnDefs={columns}
      //           />
      //         )}
      //       </LoadableList>
      //       <div className="d-none">{table}</div>
      //     </>
      //   );
      //   break;
      default:
        desktopView = table;
        mobileView = (
          <>
            <LoadableList fallback={<ShellBodyWithSpinner />}>
              {({ default: List }) => (
                <List
                  {...viewProps.list}
                  onItemClick={onItemClick}
                  rowData={data.map(datum => ({
                    data: datum.data,
                  }))}
                  columnDefs={columns}
                />
              )}
            </LoadableList>
            <div className="d-none">{table}</div>
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
