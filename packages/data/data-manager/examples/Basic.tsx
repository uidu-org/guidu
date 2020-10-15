import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Navigation from '@uidu/navigation';
import {
  ShellBody,
  ShellBodyWithSpinner,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import SideNavigation from '@uidu/side-navigation';
import { buildColumns } from '@uidu/table';
import React, { Component } from 'react';
import 'react-big-calendar/lib/sass/styles';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
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
    id: 0,
    name: 'Tutti i contatti',
    kind: 'table',
    state: {
      hiddenColumns: ['cover', 'avatar'],
    },
    fields: [
      'id',
      'member',
      'amount',
      'country',
      'paymentMethod',
      'firstName',
      'gender',
      'phone',
      'createdAt',
      'addField',
    ],
  },
  {
    id: 1,
    name: 'Bigger donations',
    kind: 'table',
    state: {
      hiddenColumns: ['cover'],
      sortBy: [{ id: 'amount', desc: true }],
    },
    filterModel: { amount: { type: 'greaterThan', filter: 100 } },
  },
  {
    id: 2,
    name: 'Galleria contatti',
    kind: 'gallery',
    state: {
      hiddenColumns: [
        'displayName',
        'firstName',
        'country',
        'percent',
        'phone',
        'createdAt',
        'updatedAt',
        'paymentMethod',
        'custom-field-1',
      ],
      sortBy: [{ id: 'amount', desc: true }],
    },
  },
  {
    id: 3,
    name: 'Lista contatti',
    kind: 'gallery',
    fields: ['avatar', 'member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
  },
  {
    id: 17,
    name: 'Galleria contatti x5',
    preferences: { columnCount: 5 },
    kind: 'gallery',
    fields: ['member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
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
    preferences: { primaryField: 'gender' },
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
];

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataViews,
      currentView: dataViews[0],
      loaded: false,
      rendered: false,
      isAutoSaving: null,
    };
  }

  toggleView = (view) => {
    if (view.id !== this.state.currentView.id) {
      this.setState({
        rendered: false,
        currentView: view,
      });
    }
  };

  addView = (dataview) => {
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
    fetchContacts().then((rowData) => this.setState({ loaded: true, rowData }));
  }

  updateView = async (currentView, props) => {
    this.setState({ isAutoSaving: 'in-progress' });
    const dataViews = this.state.dataViews.map((item) => {
      if (item.id !== currentView.id) {
        return item;
      }
      return {
        ...item,
        ...props,
      };
    });
    const updatedView = {
      ...currentView,
      ...props,
    };
    await this.setState({
      dataViews,
      isAutoSaving: 'done',
      currentView: updatedView,
    });
    return updatedView;
  };

  render() {
    const {
      loaded,
      dataViews,
      currentView,
      rowData,
      isAutoSaving,
    } = this.state;

    const schema = [
      {
        type: 'NavigationHeader',
        text: 'Contacts',
      },
      {
        type: 'NavigationSection',
        items: [
          {
            type: 'NavigationGroup',
            separator: true,
            items: dataViews.map((dataView) => {
              const d = byName[dataView.kind];
              const { icon: Icon, color } = d;
              return {
                exact: true,
                text: dataView.name,
                before: <Icon size={16} color={color} />,
                as: 'a',
                onClick: () => this.toggleView(dataView),
                type: 'NavigationItem',
              };
            }),
          },
        ],
      },
    ];

    return (
      <IntlProvider locale="en">
        <Router>
          <DataManager
            isAutoSaving={isAutoSaving}
            key={`table-for-${this.state.currentView.id}`}
            onItemClick={console.log}
            columnDefs={buildColumns([
              {
                kind: 'default',
                name: 'Default fields',
                columns: availableColumns,
              },
              {
                kind: 'custom',
                name: 'custom fields',
                columns: [
                  {
                    dataField: 'string',
                    id: 'custom-field-1',
                    field: 'custom-field-1',
                    headerName: 'custom field 1',
                  },
                ],
              },
              {
                kind: 'system',
                name: 'System fields',
                columns: [
                  {
                    dataFieldParams: {
                      onFieldAdd: () => window.alert('add a field'),
                    },
                    dataField: 'addField',
                    id: 'addField',
                    headerName: 'Add field',
                  },
                ],
              },
            ])}
            rowData={rowData}
            currentView={currentView}
            updateView={this.updateView}
            // onGridReady={() => this.setState({ rendered: true })}
          >
            {({ renderControls, renderView, renderSidebar }) => (
              <ShellMain>
                {/* <div
                  style={{
                    background: '#ff000024',
                    height: '17rem',
                    position: 'absolute',
                    width: '100%',
                  }}
                ></div> */}
                <Navigation
                  className="bg-donations"
                  schema={[
                    {
                      type: 'NavigationHeader',
                      text: 'Team',
                    },
                    {
                      type: 'PrimarySection',
                      items: [
                        {
                          path: `/`,
                          text: 'Riepilogo',
                          type: 'NavigationItem',
                        },
                        {
                          path: `/orders`,
                          text: 'Ordini',
                          type: 'NavigationItem',
                          isSortable: true,
                        },
                        {
                          path: `/attendances`,
                          text: 'Partecipanti',
                          type: 'NavigationItem',
                        },
                        {
                          path: `/messages`,
                          text: 'Messaggi agli iscritti',
                          type: 'NavigationItem',
                        },
                      ],
                    },
                    {
                      type: 'SecondarySection',
                      items: [
                        {
                          path: `/`,
                          type: 'InlineComponent',
                          component: () => (
                            <DropdownMenu
                              trigger={
                                <button className="btn btn-primary">
                                  Add a view
                                </button>
                              }
                              position="bottom right"
                            >
                              <DropdownItemGroup title="Create new">
                                {[
                                  { id: 0, kind: 'table', name: 'Table' },
                                  {
                                    id: 1,
                                    kind: 'gallery',
                                    name: 'Griglia',
                                  },
                                  {
                                    id: 2,
                                    kind: 'calendar',
                                    name: 'Calendario',
                                  },
                                  { id: 3, kind: 'board', name: 'Kanban' },
                                  {
                                    id: 4,
                                    kind: 'timeline',
                                    name: 'Timeline',
                                  },
                                  {
                                    id: 4,
                                    kind: 'list',
                                    name: 'List',
                                  },
                                ].map((view) => (
                                  <DropdownItem
                                    onClick={() => this.addView(view)}
                                    elemBefore={<PlusCircle size={14} />}
                                  >
                                    Add a {view.kind} view
                                  </DropdownItem>
                                ))}
                              </DropdownItemGroup>
                            </DropdownMenu>
                          ),
                          icon: (
                            <img
                              src="https://via.placeholder.com/24x24"
                              className="rounded-circle"
                            />
                          ),
                        },
                      ],
                    },
                  ]}
                />
                {!loaded ? (
                  <ShellBodyWithSpinner />
                ) : (
                  <>
                    <ShellBody>
                      {!loaded ? (
                        <ShellBodyWithSpinner />
                      ) : (
                        <>
                          <ShellSidebar
                            style={{
                              width: '20%',
                              background: '#fff',
                            }}
                            className="border-right"
                          >
                            <SideNavigation schema={schema} />
                          </ShellSidebar>
                          <ShellMain>
                            <ShellHeader
                              className="px-3 px-xl-4 bg-white border-bottom"
                              style={{ height: '4rem' }}
                            >
                              {renderControls({
                                controls: {
                                  viewer: {
                                    visible: true,
                                  },
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
                                },
                              })}
                            </ShellHeader>
                            <ShellBody>
                              <ShellMain>
                                {renderView({
                                  viewProps: {
                                    gallery: {
                                      gutterSize: 16,
                                    },
                                    list: {
                                      rowHeight: 96,
                                    },
                                    board: {},
                                    table: {
                                      headerHeight: 48,
                                      rowHeight: 48,
                                    },
                                  },
                                })}
                              </ShellMain>
                            </ShellBody>
                          </ShellMain>
                        </>
                      )}
                    </ShellBody>
                  </>
                )}
              </ShellMain>
            )}
          </DataManager>
        </Router>
      </IntlProvider>
    );
  }
}
