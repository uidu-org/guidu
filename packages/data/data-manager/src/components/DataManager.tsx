import loadable from '@loadable/component';
import {
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
    const { currentView } = this.props;
    this.gridApi = api;
    this.gridColumnApi = columnApi;
    if (currentView.kind === 'table') {
      columnApi.autoSizeAllColumns();
      api.sizeColumnsToFit();
      window.addEventListener('resize', function() {
        setTimeout(function() {
          api.sizeColumnsToFit();
        });
      });

      api.sizeColumnsToFit();
    }

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
      table: {},
      calendar: {},
      list: {},
      gallery: {},
    },
  }) => {
    const { rowData, onItemClick, currentView } = this.props;
    const { data, columnDefs, rowHeight } = this.state;

    if (!rowData) {
      return <ShellBodyWithSpinner />;
    }

    const table = (
      <Table
        rowHeight={rowHeight}
        {...viewProps.table}
        innerRef={this.grid}
        onGridReady={this.onGridReady}
        columnDefs={columnDefs.filter(
          column => column.type !== 'cover' && column.type !== 'avatar',
        )}
        rowData={rowData}
        onSortChanged={this.onSortChanged}
        onFilterChanged={this.onFilterChanged}
        rowSelection="multiple"
        suppressRowClickSelection
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
                rowData={data}
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
                rowData={data}
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

  renderControls = ({ availableViews }) => {
    const { currentView, dataViews, onViewChange, onViewAdd } = this.props;
    const { sorters, filters, groupers, columnDefs } = this.state;

    return (
      <>
        <Viewer
          currentView={currentView}
          dataViews={dataViews}
          availableViews={availableViews}
          onChange={onViewChange}
          onAdd={onViewAdd}
        />
        <Finder onChange={this.setSearch} />
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
        {/* <Sharer /> */}
        <More
          onDownload={() => this.gridApi.exportDataAsCsv()}
          onDuplicate={console.log}
        />
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
