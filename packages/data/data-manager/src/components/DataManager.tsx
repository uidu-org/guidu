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
import moment from 'moment';
import React, { Component } from 'react';
import Media from 'react-media';
import { DataManagerProps } from '../types';

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
      className="card card-body bg-white mb-2"
      ref={provided.innerRef}
      {...rest}
    >
      {item.content}
    </a>
  );
};

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
      filterModel: {},
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

    // setTimeout(() => {
    //   const amountFilterComponent = api.getFilterInstance('displayName');
    //   amountFilterComponent.setModel({
    //     filterType: 'text',
    //     type: 'contains',
    //     filter: 'al',
    //   });
    //   const donorFilterComponent = api.getFilterInstance('member');
    //   donorFilterComponent.setModel({
    //     filterType: 'text',
    //     type: 'contains',
    //     filter: '@yahoo.com',
    //   });
    //   api.onFilterChanged();
    // }, 5000);

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

  setGroupers = groupers => {
    console.log(groupers);
    // this.setState({ groupers });
  };

  addGrouper = grouper => {
    this.gridApi.showLoadingOverlay();
    this.setState(
      prevState => ({
        groupers: [...prevState.groupers, grouper],
      }),
      () => {
        this.updateRowGrouping();
      },
    );
  };

  removeGrouper = ({ colId }) => {
    this.gridApi.showLoadingOverlay();
    this.setState(
      prevState => ({
        groupers: prevState.groupers.filter(grouper => grouper.colId !== colId),
      }),
      () => {
        this.updateRowGrouping();
      },
    );
  };

  updateRowGrouping = () => {
    this.gridColumnApi.setRowGroupColumns(
      this.state.groupers.map(g => g.colId),
    );

    setTimeout(() => {
      this.gridApi.refreshCells({ force: true });
      this.gridApi.hideOverlay();
    }, 600);
  };

  addFilter = filter => {
    this.setState(prevState => ({
      filterModel: {
        ...prevState.filterModel,
        [filter.colId]: {},
      },
    }));
  };

  setFilterModel = filters => {
    this.setState(
      prevState => ({
        filterModel: filters.reduce((res, item) => {
          return {
            ...res,
            [item.colId]: {
              type: 'contains',
              ...item,
            },
          };
        }, prevState.filterModel),
      }),
      () => {
        this.gridApi.setFilterModel(this.state.filterModel);
        this.gridApi.onFilterChanged();
      },
    );
  };

  onFilterChanged = ({ api }) => {
    const filterModel = api.getFilterModel();
    console.log(filterModel);
    this.setState({
      data: api.getModel().rowsToDisplay,
      // filterModel,
    });
  };

  onSortChanged = ({ api }) => {
    const sortModel = api.getSortModel();
    this.setState({
      data: api.getModel().rowsToDisplay,
      sorters: sortModel,
    });
  };

  addSorter = sorter => {
    this.setState(
      prevState => ({
        sorters: [...prevState.sorters, sorter],
      }),
      () => {
        this.gridApi.setSortModel(this.state.sorters);
      },
    );
  };

  removeSorter = ({ colId }) => {
    this.setState(
      prevState => ({
        sorters: prevState.sorters.filter(sorter => sorter.colId !== colId),
      }),
      () => {
        this.gridApi.setSortModel(this.state.sorters);
      },
    );
  };

  setSorters = sorters => {
    // this.setState({ sorters });
    this.gridApi.setSortModel(sorters);
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

  renderSidebar = () => {
    const { rowData, onItemClick, currentView } = this.props;

    if (currentView.kind === 'calendar') {
      return (
        <>
          <p>List of events</p>
        </>
      );
    }

    if (currentView.kind === 'map') {
      return (
        <>
          <p>List of events</p>
        </>
      );
    }
    return null;
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
      onAddField,
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
        sorters={this.state.sorters}
        // use columnDefs from props to avoid flickering on toggling/reordering columns
        columnDefs={this.props.columnDefs.filter(
          column => column.type !== 'cover' && column.type !== 'avatar',
        )}
        rowData={rowData}
        onAddField={onAddField}
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
                  // endAccessor={item =>
                  //   moment(item.createdAt)
                  //     .add(1, 'hour')
                  //     .toDate()
                  // }
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
      desktopView = (
        <>
          <LoadableBoard fallback={<ShellBodyWithSpinner />}>
            {({ default: Board }) => {
              return (
                <Board
                  {...viewProps.board}
                  initial={rowData.reduce((res, item, index) => {
                    console.log();
                    const key = item[currentView.primaryField];
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
    const {
      sorters,
      filterModel,
      groupers,
      columnDefs,
      rowHeight,
    } = this.state;

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
            onChange={this.setFilterModel}
            addFilter={this.addFilter}
            filterModel={filterModel}
            {...availableControls.filterer.props}
          />
        )}
        {currentView.kind === 'table' && availableControls.grouper.visible && (
          <Grouper
            columnDefs={columnDefs.filter(column => !!column.enableRowGroup)}
            onChange={this.setGroupers}
            addGrouper={this.addGrouper}
            removeGrouper={this.removeGrouper}
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
            addSorter={this.addSorter}
            removeSorter={this.removeSorter}
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
      renderSidebar: this.renderSidebar,
    });
  }
}
