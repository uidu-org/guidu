import { buildColumns } from '@uidu/data-fields';
import Form from '@uidu/form';
import Select from '@uidu/select';
import { ShellBody, ShellHeader, ShellMain } from '@uidu/shell';
import React, { Component } from 'react';
import 'react-big-calendar/lib/sass/styles';
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
      filters: [{ amount: { type: 'greaterThan', filter: 100 } }],
    },
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
    kind: 'list',
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
      currentView: null,
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
    fetchContacts().then((rowData) =>
      this.setState({ loaded: true, rowData, currentView: dataViews[0] }),
    );
  }

  updateView = async (currentView, props) => {
    console.log(currentView);
    console.log(props);
    this.setState({ isAutoSaving: 'in-progress' });
    const dataViews = this.state.dataViews.map((item) => {
      if (item.id !== currentView.id) {
        return item;
      }
      return {
        ...item,
        state: props,
      };
    });
    const updatedView = {
      ...currentView,
      state: props,
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
            key={`table-for-${this.state.currentView?.id}`}
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
                    kind: 'string',
                    id: 'custom-field-1',
                    field: 'custom-field-1',
                    name: 'custom field 1',
                  },
                ],
              },
              {
                kind: 'system',
                name: 'System fields',
                columns: [
                  {
                    cellProps: {
                      onFieldAdd: () => window.alert('add a field'),
                    },
                    kind: 'addField',
                    id: 'addField',
                    name: 'Add field',
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
                <>
                  <ShellBody>
                    <>
                      {/* <ShellSidebar
                            style={{
                              width: '20%',
                              background: '#fff',
                            }}
                            className="border-right"
                          >
                            <SideNavigation schema={schema} />
                          </ShellSidebar> */}
                      <ShellMain>
                        <ShellHeader
                          className="px-3 border-bottom"
                          style={{ zIndex: 30 }}
                        >
                          <div style={{ width: 300 }}>
                            <Form>
                              <Select
                                layout="elementOnly"
                                name="dataView"
                                isClearable={false}
                                value={currentView?.id}
                                options={dataViews.map((dataView) => {
                                  const d = byName[dataView.kind];
                                  const { icon: Icon, color } = d;
                                  return {
                                    id: dataView.id,
                                    name: dataView.name,
                                    before: <Icon size={16} color={color} />,
                                    ...dataView,
                                  };
                                })}
                                onChange={(name, value, { option }) => {
                                  this.toggleView(option);
                                }}
                              />
                            </Form>
                          </div>
                          {renderControls({
                            controls: {
                              viewer: {
                                visible: false,
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
                                  gutterSize: 24,
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
                  </ShellBody>
                </>
              </ShellMain>
            )}
          </DataManager>
        </Router>
      </IntlProvider>
    );
  }
}
