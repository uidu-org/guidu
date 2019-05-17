import DataControls, {
  Filterer,
  Grouper,
  Sorter,
  Toggler,
} from '@uidu/data-controls';
import React, { Component, Fragment } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import Table from '../';
import { availableColumns, fetchContacts } from '../examples-utils';

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

  onSortChanged = () => {
    const sortModel = this.gridApi.getSortModel();
    // this.setState({ sorters: sortModel });
  };

  setSorters = sorters => {
    this.setState({ sorters });
    const sortModel = sorters.map(sorter => ({
      sort: sorter.sort.id,
      colId: sorter.colId.colId,
    }));
    this.gridApi.setSortModel(sortModel);
  };

  render() {
    const { sorters, filters, groupers } = this.state;
    console.log(this.gridApi);
    return (
      <Fragment>
        <DataControls>
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
        </DataControls>
        <Table
          innerRef={c => {
            this.grid = c;
          }}
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onSortChanged={this.onSortChanged}
          rowSelection="multiple"
          suppressRowClickSelection
        />
      </Fragment>
    );
  }
}
