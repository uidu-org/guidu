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
    visible: true,
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

const defaultRowHeight = 56;
const defaultColumnCount = 4;

export default class DataManager extends PureComponent<DataManagerProps, any> {
  static whyDidYouRender = true;

  static defaultProps = {
    onGridReady: _params => {},
    onFirstDataRendered: _params => {},
  };

  constructor(props) {
    super(props);

    // disable autosaving on first load
    this.state = {
      savingEnabled: false,
    };
  }

  /*
    we should split columnDefs and data view fields.
    ColumnDefs are static list of all possible columns for all the views
    DataViews contain info about how to render fields (eg: hidden fields), pass sort models and view configurations.

    ==> Ideally we control DataView outside DataManager, eg: switch DataView from sidebar navigation, reloads the query to backend to fecth dataview details, and re-renders DataManager.

    But, how do we handle local updates?
    A. we dont': we pass everything on parent component, that manages DataView State auto-saving it. In this case we rely only on props and adjust views on render (Functional component)
    B. we keep track of local state for toggler, sorters, filters etc., we derive state from props and we autosave every 5 seconds (or on change)
  */

  private gridApi = null;
  private gridColumnApi = null;

  onGridReady = params => {
    const { api, columnApi } = params;
    const { onGridReady, currentView } = this.props;
    this.gridApi = api;
    this.gridColumnApi = columnApi;

    initializeDataView({
      currentView,
      gridApi: api,
      gridColumnApi: columnApi,
    }).then(() => {
      onGridReady(params);
      api.hideOverlay();
    });
  };

  onFirstDataRendered = params => {
    const { onFirstDataRendered } = this.props;
    this.setState({ savingEnabled: true }, () => onFirstDataRendered(params));
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

  updateView = props => {
    const { updateView, currentView } = this.props;
    const { savingEnabled } = this.state;
    if (savingEnabled) {
      return updateView(currentView, {
        ...props,
        state: this.gridColumnApi.getColumnState(),
      });
    }
    return null;
  };

  // updateView = debounce(() => {
  //   const { updateView, currentView } = this.props;
  //   const { sorters, groupers, filterModel, columns } = this.state;
  //   return updateView({
  //     ...currentView,
  //     sorters,
  //     groupers,
  //     filterModel,
  //     fields: columns.filter(c => !c.hide).map(c => c.colId),
  //     state: this.gridColumnApi.getColumnState(),
  //   }).then(() => {
  //     this.setState({ isAutoSaving: 'done' });
  //     this.autoSaveTimeout = window.setTimeout(() => {
  //       this.setState({ isAutoSaving: Date.now() });
  //     }, 4000);
  //   });
  // }, 1500);

  /**
   *
   * Column Visibility: Toggler
   * @memberof DataManager
   * OnColumnVisible reacts to ag-grid callback, and updates columns state
   */
  onColumnVisible = ({ columns, visible }) => {
    const fields = this.gridColumnApi.getAllColumns();
    this.updateView({
      fields: fields
        .filter(c => c.colId !== 'addField' && c.visible)
        .map(c => c.colId),
    });
    // this.setState(
    //   prevState => ({
    //     columns: prevState.columns.map(column => {
    //       if (columns.map(c => c.colId).includes(column.colId)) {
    //         return {
    //           ...column,
    //           hide: !visible,
    //         };
    //       }
    //       return column;
    //     }),
    //     isAutoSaving: 'in-progress',
    //   }),
    //   () => {
    //     window.clearTimeout(this.autoSaveTimeout);
    //     this.updateView();
    //   },
    // );
  };

  /**
   *
   * Row Grouping: Sorter
   * @memberof DataManager
   * OnSortChanged is called everytime a sort is added or removed
   */
  onSortChanged = ({ api }) => {
    const sorters = api.getSortModel();
    this.updateView({ sorters });
    // this.setState(
    //   {
    //     data: api.getModel().rowsToDisplay,
    //     sorters,
    //     isAutoSaving: 'in-progress',
    //   },
    //   () => {
    //     api.refreshCells({ force: true });
    //     window.clearTimeout(this.autoSaveTimeout);
    //     this.updateView();
    //   },
    // );
  };

  /**
   *
   * Row Filter: Filterer
   * @memberof DataManager
   * OnFilterChanged reacts to ag-grid callback, and updates columns state
   */
  onFilterChanged = ({ api, ...rest }) => {
    const filterModel = api.getFilterModel();
    this.updateView({ filterModel });
    // this.setState(
    //   {
    //     data: api.getModel().rowsToDisplay,
    //     filterModel,
    //     isAutoSaving: 'in-progress',
    //   },
    //   () => {
    //     api.refreshCells({ force: true });
    //     window.clearTimeout(this.autoSaveTimeout);
    //     this.updateView();
    //   },
    // );
  };

  /**
   *
   * Row Grouping: Grouper
   * @memberof DataManager
   * OnColumnVisible reacts to ag-grid callback, and updates columns state
   */
  onColumnRowGroupChanged = ({ columns }) => {
    const groupers = columns.map(c => ({
      colId: c.colId,
    }));
    this.updateView({ groupers });
    // this.setState(
    //   {
    //     groupers,
    //     isAutoSaving: 'in-progress',
    //   },
    //   () => {
    //     window.clearTimeout(this.autoSaveTimeout);
    //     this.updateView();
    //   },
    // );
  };

  /**
   *
   * Column Moving: Reorder
   * @memberof DataManager
   * OnColumnMoved reacts to ag-grid callback, and updates columns state
   */
  onDragStopped = params => {
    this.updateView({});
    // this.updateView();
    // const columns = reorder(this.state.columns, oldIndex, newIndex);
    // this.setState({
    //   columns,
    // });
  };

  /**
   *
   * Column Resize: UI
   * @memberof DataManager
   */
  onColumnResized = params => {
    // console.log(params);
    // this.setState({
    //   isAutoSaving: 'in-progress',
    // });
    // window.clearTimeout(this.autoSaveTimeout);
    this.updateView({});
    // this.updateView();
  };

  /**
   *
   * Row Group Opened/Clodes: UI
   * @memberof DataManager
   */
  onRowGroupOpened = params => {
    // console.log(params);
    // this.setState({
    //   isAutoSaving: 'in-progress',
    // });
    // window.clearTimeout(this.autoSaveTimeout);
    this.updateView({});
    // this.updateView();
  };

  moveColumn = ({ name, oldIndex, newIndex }) => {
    this.gridColumnApi.moveColumn(name, newIndex);
    // const columns = reorder(this.state.columns, oldIndex, newIndex);
    // this.setState({
    //   columns,
    // });
  };

  setSearch = e => {
    this.gridApi.setQuickFilter(e.target.value);
  };

  setRowHeight = rowHeight => {
    const { currentView } = this.props;
    this.updateView({
      preferences: { ...currentView.preferences, rowHeight },
    }).then(() => this.gridApi.resetRowHeights());
  };

  setColumnCount = columnCount => {
    const { currentView } = this.props;
    this.updateView({
      preferences: { ...currentView.preferences, columnCount },
    }).then(() => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    });
  };

  renderSidebar = () => {
    const { rowData, onItemClick, currentView } = this.props;
    const data = this.gridApi ? this.gridApi.getModel().rowsToDisplay : [];

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
      onAddField,
      columnDefs,
    } = this.props;
    const {
      sorters = [],
      filterModel = {},
      groupers = [],
      fields = [],
      preferences = {
        rowHeight: defaultRowHeight,
        columnCount: defaultColumnCount,
      },
    } = currentView;
    const columns = this.gridColumnApi
      ? this.gridColumnApi
          .getAllGridColumns()
          .map(c => ({ ...c.colDef, hide: !c.visible }))
      : [];
    const data = this.gridApi ? this.gridApi.getModel().rowsToDisplay : [];
    const { rowHeight, columnCount } = preferences;
    return (
      <DataView
        // this.state
        groupers={groupers}
        sorters={sorters}
        filterModel={filterModel}
        // methods
        gridApi={this.gridApi}
        onGridReady={this.onGridReady}
        onFirstDataRendered={this.onFirstDataRendered}
        onFilterChanged={this.onFilterChanged}
        onSortChanged={this.onSortChanged}
        onColumnVisible={this.onColumnVisible}
        onColumnRowGroupChanged={this.onColumnRowGroupChanged}
        onDragStopped={this.onDragStopped}
        onColumnResized={this.onColumnResized}
        onRowGroupOpened={this.onRowGroupOpened}
        // props spreading
        columnDefs={columnDefs}
        rowData={rowData}
        onItemClick={onItemClick}
        currentView={currentView}
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
    const { columnDefs, currentView, updateView, isAutoSaving } = this.props;
    const {
      sorters = [],
      filterModel = {},
      groupers = [],
      preferences = { rowHeight: defaultRowHeight },
    } = currentView;
    const columns = this.gridColumnApi
      ? this.gridColumnApi
          .getAllGridColumns()
          .map(c => ({ ...c.colDef, hide: !c.visible }))
      : [];
    const { rowHeight, columnCount } = preferences;

    const availableControls = {
      ...defaultAvailableControls,
      ...controls,
    };

    return (
      <>
        {availableControls.viewer.visible && (
          <Viewer
            isConfiguratorOpen={availableControls.viewer.isConfiguratorOpen}
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
            isAutoSaving={isAutoSaving}
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
              filterModel={filterModel || {}}
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
                {...availableControls.grouper.props}
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
