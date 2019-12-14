import { Filterer, Finder, Grouper, Sorter, Viewer } from '@uidu/data-controls';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import { DataManagerProps } from '../types';
import { initializeDataView } from '../utils';
import DataView from './DataView';

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
  grouper: {
    visibile: true,
    props: {},
  },
  filterer: {
    visible: true,
    props: {},
  },
  sorter: {
    visible: true,
    props: {},
  },
  more: {
    visible: true,
    props: {},
  },
};

export default class DataManager extends PureComponent<DataManagerProps, any> {
  static whyDidYouRender = true;

  static defaultProps = {
    onGridReady: _params => {},
    onFirstDataRendered: _params => {},
  };

  /*
    we should split columnDefs and data view fields.
    ColumnDefs are static list of all possible columns for all the views
    DataViews contain info about how to render fields (eg: hidden fields), pass sort models and view configurations.

    ==> Ideally we control DataView outside DataManager, eg: switch DataView from sidebar navigation, reloads the query to backend to fecth dataview details, and re-renders DataManager.

    But, how do we handle local updates?
    A. we dont': we pass everything on parent component, that manages DataView State auto-saving it. In this case we rely only on props and adjust views on render (Functional component)
    B. we keep track of local state for toggler, sorters, filters etc., we derive state from props and we autosave every 5 seconds (or on change)
  */

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: null,
      sorters: props.currentView.sorters || [],
      filterModel: props.currentView.filterModel || {},
      groupers: props.currentView.groupers || [],
      rowHeight: 64,
      columnCount: props.currentView.columCount || 4,
    };
  }

  private gridApi = null;
  private gridColumnApi = null;

  onGridReady = params => {
    const { api, columnApi } = params;
    const { onGridReady, currentView } = this.props;
    this.gridApi = api;
    this.gridColumnApi = columnApi;

    const newState = initializeDataView({
      currentView,
      gridApi: api,
      gridColumnApi: columnApi,
    });

    this.setState(newState, () => {
      onGridReady(params);
      this.resizeTable();
    });
  };

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('receivedProps');
  //   if (nextProps.currentView.id !== this.props.currentView.id) {
  //     const newState = initializeDataView({
  //       currentView: nextProps.currentView,
  //       gridApi: this.gridApi,
  //       gridColumnApi: this.gridColumnApi,
  //     });
  //     this.setState(newState);
  //   }
  // }

  componentWillUnmount() {
    console.log('unmount');
    // window.removeEventListener('resize', this.resizeTableOnWindowResize);
    this.gridApi && this.gridApi.destroy();
  }

  // resizeTableOnWindowResize = () => {
  //   setTimeout(() => {
  //     this.gridApi.sizeColumnsToFit();
  //   });
  // };

  resizeTable = () => {
    const { currentView } = this.props;
    const { gridColumnApi, gridApi } = this;
    if (currentView.kind === 'table') {
      gridColumnApi.autoSizeAllColumns();
      // window.addEventListener('resize', this.resizeTableOnWindowResize);
      // gridApi.sizeColumnsToFit();
    }
    gridApi.hideOverlay();
  };

  filterVisibleColumnDefs = () => {
    const { currentView, columnDefs } = this.props;
    return columnDefs
      .map(column => ({
        ...column,
        hide: !currentView.fields.includes(column.colId),
      }))
      .sort(
        (a, b) =>
          currentView.fields.indexOf(a.colId) -
          currentView.fields.indexOf(b.colId),
      );
  };

  /**
   *
   * Column Visibility: Toggler
   * @memberof DataManager
   * OnColumnVisible reacts to ag-grid callback, and updates columns state
   */
  onColumnVisible = ({ columns, visible }) => {
    this.setState(
      prevState => ({
        columns: prevState.columns.map(column => {
          if (columns.map(c => c.colId).includes(column.colId)) {
            return {
              ...column,
              hide: !visible,
            };
          }
          return column;
        }),
      }),
      () => {
        this.resizeTable();
      },
    );
  };

  /**
   *
   * Row Grouping: Sorter
   * @memberof DataManager
   * OnSortChanged is called everytime a sort is added or removed
   */
  onSortChanged = ({ api }) => {
    const sorters = api.getSortModel();
    this.setState(
      {
        data: api.getModel().rowsToDisplay,
        sorters,
      },
      () => {
        api.refreshCells({ force: true });
      },
    );
  };

  /**
   *
   * Row Filter: Filterer
   * @memberof DataManager
   * OnFilterChanged reacts to ag-grid callback, and updates columns state
   */
  onFilterChanged = ({ api, ...rest }) => {
    const filterModel = api.getFilterModel();
    this.setState(
      {
        data: api.getModel().rowsToDisplay,
        filterModel,
      },
      () => {
        api.refreshCells({ force: true });
      },
    );
  };

  /**
   *
   * Row Grouping: Grouper
   * @memberof DataManager
   * OnColumnVisible reacts to ag-grid callback, and updates columns state
   */
  onColumnRowGroupChanged = ({ columns }) => {
    this.setState({
      groupers: columns.map(c => ({
        colId: c.colId,
      })),
    });
  };

  /**
   *
   * Column Moving: Reorder
   * @memberof DataManager
   * OnColumnMoved reacts to ag-grid callback, and updates columns state
   */
  onColumnMoved = params => {
    console.log(params);
    // const columns = reorder(this.state.columns, oldIndex, newIndex);
    // this.setState({
    //   columns,
    // });
  };

  moveColumn = ({ name, oldIndex, newIndex }) => {
    this.gridColumnApi.moveColumn(name, newIndex);
    const columns = reorder(this.state.columns, oldIndex, newIndex);
    this.setState({
      columns,
    });
  };

  setSearch = e => {
    this.gridApi.setQuickFilter(e.target.value);
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

  setColumnCount = columnCount => {
    this.setState({ columnCount }, () =>
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300),
    );
  };

  renderSidebar = () => {
    const { rowData, onItemClick, currentView } = this.props;
    const { data } = this.state;

    if (['calendar', 'map'].includes(currentView.kind)) {
      if (!data) {
        return <Spinner />;
      }

      if (currentView.kind === 'calendar') {
        return (
          <>
            <p>List of events</p>
            {data.map(datum => (
              <p>
                {datum.data
                  ? `${datum.data.createdAt} - ${datum.data.id}`
                  : 'Group'}
              </p>
            ))}
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
      columnDefs,
    } = this.props;
    const {
      data,
      columns,
      rowHeight,
      columnCount,
      groupers,
      sorters,
      filterModel,
    } = this.state;
    return (
      <DataView
        // this.state
        groupers={groupers}
        sorters={sorters}
        filterModel={filterModel}
        // methods
        onGridReady={this.onGridReady}
        onFilterChanged={this.onFilterChanged}
        onSortChanged={this.onSortChanged}
        onColumnVisible={this.onColumnVisible}
        onColumnRowGroupChanged={this.onColumnRowGroupChanged}
        onColumnMoved={this.onColumnMoved}
        // props spreading
        columnDefs={columnDefs}
        rowData={rowData}
        onItemClick={onItemClick}
        currentView={currentView}
        onFirstDataRendered={onFirstDataRendered}
        onAddField={onAddField}
        viewProps={viewProps}
        data={data}
        columns={columns}
        rowHeight={rowHeight}
        columnCount={columnCount}
      />
    );
  };

  renderControls = ({ controls }) => {
    const { currentView, updateView } = this.props;
    const {
      sorters,
      filterModel,
      groupers,
      columns,
      rowHeight,
      columnCount,
    } = this.state;

    const availableControls = {
      ...defaultAvailableControls,
      ...controls,
    };

    return (
      <>
        {availableControls.viewer.visible && (
          <Viewer
            gridApi={this.gridApi}
            gridColumnApi={this.gridColumnApi}
            availableControls={availableControls}
            currentView={currentView}
            updateView={updateView}
            columnDefs={columns}
            groupers={groupers}
            onDragEnd={this.moveColumn}
            onResize={this.setRowHeight}
            rowHeight={rowHeight}
            onDownload={() => this.gridApi.exportDataAsCsv()}
            columnCount={columnCount}
            onSetColumnCount={this.setColumnCount}
            actions={availableControls.more.actions}
          />
        )}
        <div className="d-flex align-items-center">
          {currentView.kind === 'calendar' &&
            availableControls.calendarToolbar.visible && (
              <div
                id="calendar-toolbar"
                className="d-flex align-items-center mr-2"
              />
            )}
          {availableControls.filterer.visible && (
            <Filterer
              gridApi={this.gridApi}
              gridColumnApi={this.gridColumnApi}
              columnDefs={columns}
              filterModel={filterModel}
              {...availableControls.filterer.props}
            />
          )}
          {availableControls.sorter.visible && (
            <Sorter
              gridApi={this.gridApi}
              gridColumnApi={this.gridColumnApi}
              columnDefs={columns}
              sorters={sorters}
              {...availableControls.sorter.props}
            />
          )}
          {currentView.kind === 'table' &&
            availableControls.grouper.visible && (
              <Grouper
                gridApi={this.gridApi}
                gridColumnApi={this.gridColumnApi}
                columnDefs={columns}
                groupers={groupers}
                {...availableControls.sorter.props}
              />
            )}
          {availableControls.finder.visible && (
            <Finder
              onChange={this.setSearch}
              {...availableControls.finder.props}
            />
          )}
        </div>
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
