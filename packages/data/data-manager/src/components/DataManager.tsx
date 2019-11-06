import loadable from '@loadable/component';
import {
  CalendarToolbar,
  Customizer,
  Filterer,
  Finder,
  Grouper,
  More,
  Resizer,
  Sorter,
  Toggler,
  Viewer,
} from '@uidu/data-controls';
import { ShellBodyWithSpinner } from '@uidu/shell';
import Table from '@uidu/table';
import { rollup } from 'd3-array';
import moment from 'moment';
import React, { Component } from 'react';
import Media from 'react-media';
import { DataManagerProps } from '../types';

const LoadableBoard = (loadable as any).lib(() => import('@uidu/board'));
const LoadableCalendar = (loadable as any).lib(() => import('@uidu/calendar'));
const LoadableGallery = (loadable as any).lib(() => import('@uidu/gallery'));
const LoadableList = (loadable as any).lib(() => import('@uidu/list'));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const defaultAvailableControls = {
  calendarToolbar: {
    visible: true,
    props: {},
  },
  finder: {
    visible: true,
    props: {},
  },
  viewer: {
    visible: true,
    props: {},
  },
  toggler: {
    visible: true,
    props: {},
  },
  customizer: {
    visible: true,
    props: {},
  },
  filterer: {
    visible: true,
    props: {},
  },
  grouper: {
    visible: true,
    props: {},
  },
  sorter: {
    visible: true,
    props: {},
  },
  resizer: {
    visible: true,
    props: {},
  },
  more: {
    visible: true,
    props: {},
  },
};

export default class DataManager extends Component<DataManagerProps, any> {
  static defaultProps = {
    onGridReady: _params => {},
    onFirstDataRendered: _params => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      columnDefs: props.columnDefs,
      data: [],
      sorters: [],
      filters: [],
      groupers: [],
      rowHeight: 64,
    };
  }

  private grid = React.createRef();
  private gridApi = null;
  private gridColumnApi = null;

  onGridReady = params => {
    const { api, columnApi } = params;
    const { onGridReady } = this.props;
    this.gridApi = api;
    this.gridColumnApi = columnApi;
    this.resizeTable();

    this.setState(
      {
        data: api.getModel().rowsToDisplay,
      },
      () => {
        onGridReady(params);
      },
    );
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTableOnWindowResize);
    this.gridApi && this.gridApi.destroy();
  }

  resizeTableOnWindowResize = () => {
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    });
  };

  resizeTable = () => {
    const { currentView } = this.props;
    const { gridApi, gridColumnApi } = this;
    if (currentView.kind === 'table') {
      gridColumnApi.autoSizeAllColumns();
      window.addEventListener('resize', this.resizeTableOnWindowResize);
      gridApi.sizeColumnsToFit();
    }
  };

  toggleColumn = (name, active) => {
    this.gridColumnApi.setColumnVisible(name, active);
    this.setState(
      {
        columnDefs: this.state.columnDefs.map(columnDef => {
          if (columnDef.colId === name) {
            return {
              ...columnDef,
              hide: !active,
            };
          }
          return columnDef;
        }),
      },
      () => {
        this.resizeTable();
      },
    );
  };

  moveColumn = ({ name, oldIndex, newIndex }) => {
    this.gridColumnApi.moveColumn(name, newIndex);
    const columnDefs = reorder(this.state.columnDefs, oldIndex, newIndex);
    this.setState({
      columnDefs,
    });
  };

  setFilters = async () => console.log;

  setGroupers = groupers => {
    this.setState({ groupers });
  };

  onSortChanged = ({ api }) => {
    const sortModel = api.getSortModel();
    this.setState({
      data: api.getModel().rowsToDisplay,
      // sorters: sortModel,
    });
  };

  onFilterChanged = ({ api }) => {
    this.setState({
      data: api.getModel().rowsToDisplay,
      // filters: sortModel,
    });
  };

  setSorters = sorters => {
    this.setState({ sorters });
    const sortModel = sorters.map(sorter => ({
      sort: sorter.sort.id,
      colId: sorter.colId.colId,
    }));
    this.gridApi.setSortModel(sortModel);
  };

  setSearch = e => {
    this.gridApi.setQuickFilter(e.target.value);
  };

  toggleView = view => {
    this.setState({
      currentView: view,
    });
  };

  setRowHeight = rowHeight => {
    this.setState(
      {
        rowHeight,
      },
      () => {
        this.gridApi.resetRowHeights();
      },
    );
  };

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

  renderView = ({
    viewProps = {
      board: {},
      calendar: {},
      gallery: {},
      list: {},
      table: {},
    },
  }) => {
    const {
      rowData,
      onItemClick,
      currentView,
      onFirstDataRendered,
    } = this.props;
    const { data, columnDefs, rowHeight } = this.state;

    if (!rowData) {
      return <ShellBodyWithSpinner />;
    }

    const table = (
      <Table
        rowDoubleClicked={() => null}
        rowSelection="multiple"
        suppressRowClickSelection
        {...viewProps.table}
        // @ts-ignore
        rowHeight={(viewProps.table || {}).rowHeight || rowHeight}
        innerRef={this.grid}
        onGridReady={this.onGridReady}
        onFirstDataRendered={onFirstDataRendered}
        // use columnDefs from props to avoid flickering on toggling/reordering columns
        columnDefs={this.props.columnDefs.filter(
          column => column.type !== 'cover' && column.type !== 'avatar',
        )}
        rowData={rowData}
        onSortChanged={this.onSortChanged}
        onFilterChanged={this.onFilterChanged}
        onRowClicked={onItemClick}
        accentedSort
      />
    );

    let desktopView = table;

    if (currentView.kind === 'calendar') {
      desktopView = (
        <>
          <LoadableCalendar fallback={<ShellBodyWithSpinner />}>
            {({ default: Calendar }) => {
              return (
                <Calendar
                  {...viewProps.calendar}
                  onItemClick={onItemClick}
                  events={data.map(datum => ({
                    data: datum.data,
                  }))}
                  startAccessor={item => moment(item.createdAt).toDate()}
                  titleAccessor={item => item.email}
                  endAccessor={item =>
                    moment(item.createdAt)
                      .add(1, 'hour')
                      .toDate()
                  }
                  columnDefs={columnDefs}
                  // toolbar={false}
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
    }

    if (currentView.kind === 'board') {
      console.log(
        Array.from(
          rollup(rowData, item => item, item => item.id),
          ([key, value]) => ({ key, value }),
        ),
      );
      desktopView = null;
      // (
      //   <>
      //     <LoadableBoard fallback={<ShellBodyWithSpinner />}>
      //       {({ default: Board }) => {
      //         return (
      //           <Board
      //             {...viewProps.board}
      //             initial={groups(rowData, item => item.id)}
      //             onItemClick={onItemClick}
      //             // events={data.map(datum => ({
      //             //   data: datum.data,
      //             // }))}
      //             // startAccessor={item => moment(item.createdAt).toDate()}
      //             // titleAccessor={item => item.email}
      //             // endAccessor={item =>
      //             //   moment(item.createdAt)
      //             //     .add(1, 'hour')
      //             //     .toDate()
      //             // }
      //             // columnDefs={columnDefs}
      //             // // toolbar={false}
      //             // components={{
      //             //   toolbar: CalendarToolbar,
      //             // }}
      //           />
      //         );
      //       }}
      //     </LoadableBoard>
      //     <div className="d-none">{table}</div>
      //   </>
      // );
    }

    if (currentView.kind === 'gallery') {
      desktopView = (
        <>
          <LoadableGallery fallback={<ShellBodyWithSpinner />}>
            {({ default: Gallery }) => (
              <Gallery
                {...viewProps.gallery}
                onItemClick={onItemClick}
                rowData={data.map(datum => ({
                  data: datum.data,
                }))}
                columnDefs={columnDefs}
              />
            )}
          </LoadableGallery>
          <div className="d-none">{table}</div>
        </>
      );
    }

    return this.renderResponsiveView({
      mobileView: (
        <>
          <LoadableList fallback={<ShellBodyWithSpinner />}>
            {({ default: List }) => (
              <List
                {...viewProps.list}
                onItemClick={onItemClick}
                rowData={data.map(datum => ({
                  data: datum.data,
                }))}
                columnDefs={columnDefs}
              />
            )}
          </LoadableList>
          <div className="d-none">{table}</div>
        </>
      ),
      desktopView,
    });
  };

  renderControls = ({ controls }) => {
    const { currentView, dataViews, onViewChange, onViewAdd } = this.props;
    const { sorters, filters, groupers, columnDefs, rowHeight } = this.state;

    const availableControls = {
      ...defaultAvailableControls,
      ...controls,
    };

    return (
      <>
        {availableControls.finder.visible && (
          <Finder
            onChange={this.setSearch}
            {...availableControls.finder.props}
          />
        )}
        {availableControls.viewer.visible && (
          <Viewer
            currentView={currentView}
            dataViews={dataViews}
            onChange={onViewChange}
            onAdd={onViewAdd}
            {...availableControls.viewer.props}
          />
        )}
        {availableControls.filterer.visible && (
          <Filterer
            columnDefs={columnDefs.filter(
              column => column.type !== 'cover' && column.type !== 'avatar',
            )}
            onChange={this.setFilters}
            filters={filters}
            {...availableControls.filterer.props}
          />
        )}
        {currentView.kind === 'list' && availableControls.grouper.visible && (
          <Grouper
            columnDefs={columnDefs}
            onChange={this.setGroupers}
            groupers={groupers}
            {...availableControls.grouper.props}
          />
        )}
        {availableControls.sorter.visible && (
          <Sorter
            columnDefs={columnDefs.filter(
              column => column.type !== 'cover' && column.type !== 'avatar',
            )}
            onChange={this.setSorters}
            sorters={sorters}
            {...availableControls.sorter.props}
          />
        )}
        {currentView.kind === 'table' && availableControls.toggler.visible && (
          <Toggler
            columnDefs={columnDefs.filter(
              column => column.type !== 'cover' && column.type !== 'avatar',
            )}
            onToggle={this.toggleColumn}
            onDragEnd={this.moveColumn}
            {...availableControls.toggler.props}
          />
        )}
        {(currentView.kind === 'gallery' || currentView.kind === 'list') &&
          availableControls.customizer.visible && (
            <Customizer
              columnDefs={columnDefs}
              onToggle={this.toggleColumn}
              onSortEnd={this.moveColumn}
              {...availableControls.customizer.props}
            />
          )}
        {currentView.kind === 'table' && availableControls.resizer.visible && (
          <Resizer
            onResize={this.setRowHeight}
            rowHeight={rowHeight}
            {...availableControls.resizer.props}
          />
        )}
        {currentView.kind === 'calendar' &&
          availableControls.calendarToolbar.visible && (
            <div id="calendar-toolbar" className="d-flex align-items-center" />
          )}
        {availableControls.more.visible && (
          <More
            onDownload={() => this.gridApi.exportDataAsCsv()}
            {...availableControls.more.props}
          />
        )}
      </>
    );
  };

  render() {
    const { children } = this.props;

    return (children as any)({
      renderControls: this.renderControls,
      renderView: this.renderView,
    });
  }
}
