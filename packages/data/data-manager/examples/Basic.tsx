import React, { Component, Fragment } from 'react';
import DataManager from '../';
import { availableColumns, fetchContacts } from '../../table/examples-utils';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [...availableColumns],
    };
  }

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ rowData }));
  }

  render() {
    return (
      <DataManager
        availableViews={['table', 'gallery', 'calendar', 'list']}
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}
      >
        {({ renderControls, renderView }) => (
          <Fragment>
            <div className="d-flex px-xl-4 p-3">
              {renderControls({
                availableViews: ['table', 'gallery', 'calendar', 'list'],
              })}
            </div>
            {renderView({
              className: 'bg-light',
              viewProps: {
                gallery: {
                  gutterSize: 24,
                  columnCount: 3,
                },
                list: {
                  gutterSize: 24,
                },
              },
            })}
          </Fragment>
        )}
      </DataManager>
    );
  }
}
