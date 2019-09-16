import {
  ShellBody,
  ShellBodyWithSidebar,
  ShellBodyWithSpinner,
  ShellHeader,
} from '@uidu/shell';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';
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
      loaded: false,
    };
  }

  toggleView = view => {
    this.setState({
      currentView: view,
    });
  };

  addView = dataview => {
    const newView = {
      id: this.state.dataViews.length + 1,
      kind: dataview.kind,
      name: `New ${dataview.name}`,
    };
    this.setState({
      dataViews: [...this.state.dataViews, newView],
      currentView: newView,
    });
  };

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ loaded: true, rowData }));
  }

  render() {
    const { loaded } = this.state;
    return (
      <DataManager
        availableViews={[
          { id: 0, kind: 'table', name: 'Table' },
          { id: 1, kind: 'gallery', name: 'Griglia' },
          { id: 2, kind: 'calendar', name: 'Calendario' },
        ]}
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}
        currentView={this.state.currentView}
        dataViews={this.state.dataViews}
        onViewChange={this.toggleView}
        onViewAdd={this.addView}
      >
        {({ renderControls, renderView }) => (
          <>
            <ShellHeader>
              {renderControls({
                controls: {
                  finder: {
                    visible: true,
                  },
                  viewer: {
                    visible: true,
                    props: {
                      availableViews: [
                        { id: 0, kind: 'table', name: 'Table' },
                        { id: 1, kind: 'gallery', name: 'Griglia' },
                        { id: 2, kind: 'calendar', name: 'Calendario' },
                      ],
                    },
                  },
                },
              })}
            </ShellHeader>

            <ShellBody scrollable>
              {!loaded ? (
                <ShellBodyWithSpinner></ShellBodyWithSpinner>
              ) : (
                <ShellBodyWithSidebar sidebar={<p>Pippo</p>}>
                  {renderView({
                    viewProps: {
                      gallery: {
                        gutterSize: 24,
                        columnCount: 4,
                      },
                      list: {
                        rowHeight: 128,
                      },
                    },
                  })}
                </ShellBodyWithSidebar>
              )}
            </ShellBody>
          </>
        )}
      </DataManager>
    );
  }
}
