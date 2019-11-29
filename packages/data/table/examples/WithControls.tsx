import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import {
  Filterer,
  Finder,
  Grouper,
  More,
  Resizer,
  Sharer,
  Sorter,
  Toggler,
} from '@uidu/data-controls';
import React, { Component, Fragment } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import Table from '../';
import { availableColumns, fetchContacts } from '../examples-utils';
import '../themes/uidu.scss';

export default class WithControls extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [...availableColumns],
      sorters: [],
      filters: [],
      groupers: [],
    };
  }

  private grid = React.createRef();
  private gridApi = null;
  private gridColumnApi = null;

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ rowData }));
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  toggleColumn = (name, active) => {
    this.gridColumnApi.setColumnVisible(name, active);
    this.setState({
      columnDefs: this.state.columnDefs.map(columnDef => {
        if (columnDef.field === name) {
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

  onSortChanged = ({ api, columnApi }) => {
    const sortModel = api.getSortModel();
    // this.setState({ sorters: sortModel });
  };

  onFilterChanged = ({ api, columnApi }) => {};

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

  render() {
    const { sorters, filters, groupers } = this.state;

    return (
      <Fragment>
        <div>
          <div>
            <Toggler
              fields={this.state.columnDefs}
              onToggle={this.toggleColumn}
              onSortEnd={this.moveColumn}
            />
            <Filterer
              fields={this.state.columnDefs}
              onChange={this.setFilters}
              filters={filters}
            />
            <Grouper
              fields={this.state.columnDefs}
              onChange={this.setGroupers}
              groupers={groupers}
            />
            <Sorter
              fields={this.state.columnDefs}
              onChange={this.setSorters}
              sorters={sorters}
            />
            <Resizer />
            <Sharer />
            <More
              onDownload={() => this.gridApi.exportDataAsCsv()}
              onDuplicate={console.log}
            />
          </div>
          <div className="ml-auto">
            <Finder onChange={this.setSearch} />
          </div>
        </div>
        <Table
          innerRef={this.grid}
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onSortChanged={this.onSortChanged}
          onFilterChanged={this.onFilterChanged}
          rowSelection="multiple"
          suppressRowClickSelection
          rowHeight={48}
        />
      </Fragment>
    );
  }
}
