import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import {
  ShellBody,
  ShellBodyWithSidebar,
  ShellBodyWithSpinner,
  ShellHeader,
} from '@uidu/shell';
import { buildColumns } from '@uidu/table';
import React, { Component } from 'react';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import DataManager from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { availableColumns, fetchContacts } from '../../table/examples-utils';
import '../../table/themes/uidu.scss';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  height: '100%',
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const dataViews = [
  {
    id: 1,
    name: 'Tutti i contatti',
    kind: 'table',
    fields: [
      'avatar',
      'country',
      'paymentMethod',
      'member',
      'amount',
      'firstName',
      'gender',
      'phone',
      'addField',
    ],
    groupers: [{ colId: 'country' }],
    sorters: [{ colId: 'amount', sort: 'desc' }],
  },
  {
    id: 2,
    name: 'Galleria contatti',
    kind: 'gallery',
    fields: ['avatar', 'member', 'amount'],
    sorters: [{ colId: 'amount', sort: 'desc' }],
  },
  {
    id: 4,
    name: 'Calendario contatti',
    kind: 'calendar',
    primaryField: 'createdAt',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 5,
    name: 'Trello contatti',
    primaryField: 'country',
    kind: 'board',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 6,
    name: 'Timeline',
    primaryField: 'country',
    kind: 'timeline',
    fields: ['avatar', 'member', 'amount'],
  },
  {
    id: 7,
    name: 'Map',
    primaryField: 'country',
    kind: 'map',
    fields: ['avatar', 'member', 'amount'],
  },
];

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataViews,
      currentView: dataViews[0],
      loaded: false,
      rendered: false,
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
      fields: [],
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
    const { loaded, dataViews } = this.state;
    return (
      <IntlProvider locale="en">
        <Router>
          <DataManager
            columnDefs={buildColumns(availableColumns)}
            rowData={this.state.rowData}
            currentView={this.state.currentView}
            onFirstDataRendered={() => this.setState({ rendered: true })}
          >
            {({ renderControls, renderView, renderSidebar }) => (
              <>
                <ShellHeader className="px-3 px-xl-4">
                  {renderControls({
                    controls: {
                      finder: {
                        visible: true,
                      },
                      more: {
                        visible: true,
                        actions: [
                          {
                            name: 'Rename',
                            rename: true,
                          },
                        ],
                      },
                      viewer: {
                        visible: true,
                      },
                    },
                  })}
                  <DropdownMenu
                    trigger={
                      <button className="btn btn-primary">Switch view</button>
                    }
                    position="bottom right"
                  >
                    <DropdownItemGroup>
                      {dataViews.map(dataView => {
                        const d = byName[dataView.kind];
                        const { icon: Icon, color } = d;
                        return (
                          <DropdownItem
                            onClick={() => this.toggleView(dataView)}
                            elemBefore={<Icon size={14} color={color} />}
                          >
                            {dataView.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownItemGroup>
                    <DropdownItemGroup title="Create new">
                      {[
                        { id: 0, kind: 'table', name: 'Table' },
                        { id: 1, kind: 'gallery', name: 'Griglia' },
                        { id: 2, kind: 'calendar', name: 'Calendario' },
                        { id: 3, kind: 'board', name: 'Kanban' },
                        { id: 4, kind: 'timeline', name: 'Timeline' },
                      ].map(view => (
                        <DropdownItem
                          onClick={() => this.addView(view)}
                          elemBefore={<PlusCircle size={14} />}
                        >
                          Add a {view.kind} view
                        </DropdownItem>
                      ))}
                    </DropdownItemGroup>
                  </DropdownMenu>
                </ShellHeader>

                <ShellBody scrollable>
                  {!loaded ? (
                    <ShellBodyWithSpinner></ShellBodyWithSpinner>
                  ) : (
                    <ShellBodyWithSidebar
                      sidebar={
                        renderSidebar() && (
                          <div className="col-sm-3">{renderSidebar({})}</div>
                        )
                      }
                    >
                      <Transition in={this.state.rendered} timeout={duration}>
                        {state => (
                          <div
                            style={{
                              ...defaultStyle,
                              ...transitionStyles[state],
                            }}
                          >
                            {renderView({
                              viewProps: {
                                gallery: {
                                  gutterSize: 24,
                                  columnCount: 4,
                                },
                                list: {
                                  rowHeight: 128,
                                },
                                board: {},
                                table: {
                                  headerHeight: 48,
                                },
                              },
                            })}
                          </div>
                        )}
                      </Transition>
                    </ShellBodyWithSidebar>
                  )}
                </ShellBody>
              </>
            )}
          </DataManager>
        </Router>
      </IntlProvider>
    );
  }
}
