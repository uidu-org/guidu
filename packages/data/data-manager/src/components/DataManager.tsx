import loadable from '@loadable/component';
import {
  Customizer,
  Filterer,
  Finder,
  Grouper,
  More,
  Resizer,
  Sharer,
  Sorter,
  Toggler,
  Viewer,
} from '@uidu/data-controls';
import { ShellBody } from '@uidu/shell';
import Spinner from '@uidu/spinner';
import Table from '@uidu/table';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { DataManagerProps } from '../types';

const LoadableGallery = (loadable as any).lib(() => import('@uidu/gallery'));
const LoadableCalendar = (loadable as any).lib(() => import('@uidu/calendar'));
const LoadableList = (loadable as any).lib(() => import('@uidu/list'));

export default class DataManager extends Component<DataManagerProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: props.columnDefs,
      data: [],
      sorters: [],
      filters: [],
      groupers: [],
      rowHeight: 48,
    };
  }

  private grid = React.createRef();
  private gridApi = null;
  private gridColumnApi = null;

  onGridReady = ({ api, columnApi }) => {
    this.gridApi = api;
    this.gridColumnApi = columnApi;
    columnApi.autoSizeAllColumns();
    api.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        api.sizeColumnsToFit();
      });
    });

    api.sizeColumnsToFit();

    this.setState({
      data: api.getModel().rowsToDisplay,
    });
  };

  toggleColumn = (name, active) => {
    this.gridColumnApi.setColumnVisible(name, active);
    this.setState({
      columnDefs: this.state.columnDefs.map(columnDef => {
        if (columnDef.colId === name) {
          return {
            ...columnDef,
            hide: !active,
          };
        }
        return columnDef;
      }),
    });
  };

  moveColumn = ({ oldIndex, newIndex }) => {
    const { columnDefs } = this.state;

    this.setState({
      columnDefs: arrayMove(columnDefs, oldIndex, newIndex),
    });
  };

  setFilters = console.log;

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
    console.log(rowHeight);
    this.setState(
      {
        rowHeight,
      },
      () => {
        this.gridApi.resetRowHeights();
      },
    );
  };

  renderView = ({
    viewProps = {
      table: {
        className: null,
      },
      calendar: {
        className: null,
      },
      list: {
        className: null,
      },
      gallery: {
        className: null,
      },
    },
  }) => {
    const { rowData, onItemClick, currentView } = this.props;
    const { data, columnDefs, rowHeight } = this.state;

    if (!rowData) {
      return (
        <ShellBody className="d-flex align-items-center justify-content-center">
          <Spinner />
        </ShellBody>
      );
    }

    const table = (
      <Table
        {...viewProps.table}
        innerRef={this.grid}
        onGridReady={this.onGridReady}
        columnDefs={columnDefs.filter(column => column.type !== 'cover')}
        rowData={rowData}
        onSortChanged={this.onSortChanged}
        onFilterChanged={this.onFilterChanged}
        rowSelection="multiple"
        suppressRowClickSelection
        rowHeight={rowHeight}
      />
    );

    if (currentView.kind === 'table') {
      return (
        <ShellBody
          className={(viewProps.table || ({} as any)).className}
          scrollable
        >
          {table}
        </ShellBody>
      );
    }

    if (currentView.kind === 'calendar') {
      return (
        <Fragment>
          <LoadableCalendar
            fallback={
              <ShellBody className="d-flex align-items-center justify-content-center">
                <Spinner />
              </ShellBody>
            }
          >
            {({ default: Calendar }) => {
              return (
                <Calendar
                  {...viewProps.calendar}
                  onItemClick={onItemClick}
                  events={data.map(datum => datum.data)}
                  startAccessor={item => moment(item.createdAt).toDate()}
                  titleAccessor={item => item.email}
                  endAccessor={item =>
                    moment(item.createdAt)
                      .add(1, 'hour')
                      .toDate()
                  }
                  columnDefs={columnDefs}
                />
              );
            }}
          </LoadableCalendar>
          <div className="d-none">{table}</div>
        </Fragment>
      );
    }

    if (currentView.kind === 'list') {
      return (
        <Fragment>
          <LoadableList
            fallback={
              <ShellBody className="d-flex align-items-center justify-content-center">
                <Spinner />
              </ShellBody>
            }
          >
            {({ default: List }) => (
              <ShellBody
                scrollable
                className={(viewProps.list || ({} as any)).className}
              >
                <List
                  {...viewProps.list}
                  onItemClick={onItemClick}
                  rowData={data}
                  columnDefs={columnDefs}
                />
              </ShellBody>
            )}
          </LoadableList>
          <div className="d-none">{table}</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <LoadableGallery
          fallback={
            <ShellBody className="d-flex align-items-center justify-content-center">
              <Spinner />
            </ShellBody>
          }
        >
          {({ default: Gallery }) => (
            <ShellBody
              className={(viewProps.gallery || ({} as any)).className}
              scrollable
            >
              <Gallery
                {...viewProps.gallery}
                onItemClick={onItemClick}
                rowData={data}
                columnDefs={columnDefs}
              />
            </ShellBody>
          )}
        </LoadableGallery>
        <div className="d-none">{table}</div>
      </Fragment>
    );
  };

  renderControls = ({ availableViews }) => {
    const { currentView, dataViews, onViewChange, onViewAdd } = this.props;
    const { sorters, filters, groupers, columnDefs } = this.state;

    return (
      <Fragment>
        <Viewer
          currentView={currentView}
          dataViews={dataViews}
          availableViews={availableViews}
          onChange={onViewChange}
          onAdd={onViewAdd}
        />
        {currentView.kind === 'table' && (
          <Toggler
            fields={columnDefs}
            onToggle={this.toggleColumn}
            onSortEnd={this.moveColumn}
          />
        )}
        {(currentView.kind === 'gallery' || currentView.kind === 'list') && (
          <Customizer
            fields={columnDefs}
            onToggle={this.toggleColumn}
            onSortEnd={this.moveColumn}
          />
        )}
        <Filterer
          fields={columnDefs}
          onChange={this.setFilters}
          filters={filters}
        />
        {currentView.kind === 'list' && (
          <Grouper
            fields={columnDefs}
            onChange={this.setGroupers}
            groupers={groupers}
          />
        )}
        <Sorter
          fields={columnDefs}
          onChange={this.setSorters}
          sorters={sorters}
        />
        {currentView.kind === 'table' && (
          <Resizer onResize={this.setRowHeight} />
        )}
        <Sharer />
        <Finder onChange={this.setSearch} />
        <More
          onDownload={() => this.gridApi.exportDataAsCsv()}
          onDuplicate={console.log}
        />
      </Fragment>
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
