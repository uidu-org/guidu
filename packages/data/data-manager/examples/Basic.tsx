import React, { Component, Fragment } from 'react';
import 'react-big-calendar/lib/sass/styles.scss';
import DataManager from '../';
import { availableColumns, fetchContacts } from '../../table/examples-utils';

const dataViews = [
  {
    id: 1,
    name: 'Tutti i contatti',
    kind: 'table',
  },
  {
    id: 2,
    name: 'Galleria contatti',
    kind: 'gallery',
  },
];

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataViews,
      currentView: dataViews[0],
      columnDefs: [...availableColumns],
    };
  }

  toggleView = view => {
    this.setState({
      currentView: view,
    });
  };

  addView = kind => {
    const newView = {
      id: this.state.dataViews.length + 1,
      kind,
      name: `new ${kind}`,
    };
    this.setState({
      dataViews: [...this.state.dataViews, newView],
      currentView: newView,
    });
  };

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ rowData }));
  }

  render() {
    return (
      <DataManager
        availableViews={['table', 'gallery', 'calendar', 'list']}
        columnDefs={this.state.columnDefs.slice(0, 5)}
        rowData={this.state.rowData}
        currentView={this.state.currentView}
        dataViews={this.state.dataViews}
        onViewChange={this.toggleView}
        onViewAdd={this.addView}
      >
        {({ renderControls, renderView }) => (
          <Fragment>
            <div className="d-flex px-xl-4 p-3">
              {renderControls({
                availableViews: ['table', 'gallery', 'calendar', 'list'],
              })}
            </div>
            {renderView({
              viewProps: {
                gallery: {
                  className: 'bg-light',
                  gutterSize: 24,
                  columnCount: 3,
                },
                list: {
                  gutterSize: 24,
                  rowHeight: 128,
                },
              },
            })}
          </Fragment>
        )}
      </DataManager>
    );
  }
}
