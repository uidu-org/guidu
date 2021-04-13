import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { More } from '@uidu/data-controls';
import Form from '@uidu/form';
import Select from '@uidu/select';
import { ShellBody, ShellHeader, ShellMain } from '@uidu/shell';
import React, { useRef, useState } from 'react';
import 'react-big-calendar/lib/sass/styles';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataManagerNext } from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { columnDefsNext } from '../../table/examples-utils';
// import '../../table/themes/uidu.scss';

const defaultQuery = {
  dimensions: [
    'Users.id',
    'Users.email',
    'Users.firstName',
    'Users.lastName',
    'Users.avatar',
    'Users.createdAt',
    'Users.donationsAmount',
  ],
};

const defaultDataViews = [
  {
    id: 0,
    name: 'Tutti i contatti',
    kind: 'table',
    query: defaultQuery,
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
    query: defaultQuery,
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
    query: defaultQuery,
  },
  {
    id: 3,
    name: 'Lista contatti',
    kind: 'list',
    fields: ['avatar', 'member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
    query: defaultQuery,
  },
  {
    id: 17,
    name: 'Galleria contatti x5',
    preferences: { columnCount: 5 },
    kind: 'gallery',
    fields: ['member', 'amount'],
    sorters: [{ id: 'amount', desc: true }],
    query: defaultQuery,
  },
  {
    id: 4,
    name: 'Calendario contatti',
    kind: 'calendar',
    primaryField: 'createdAt',
    fields: ['avatar', 'member', 'amount'],
    query: defaultQuery,
  },
  {
    id: 5,
    name: 'Trello contatti',
    preferences: { primaryField: 'gender' },
    kind: 'board',
    fields: ['avatar', 'member', 'amount'],
    query: defaultQuery,
  },
  {
    id: 6,
    name: 'Timeline',
    primaryField: 'country',
    kind: 'timeline',
    fields: ['avatar', 'member', 'amount'],
    query: defaultQuery,
  },
];

const API_URL = 'http://localhost:4000';
const CUBEJS_TOKEN = '';
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`,
});

function CubeExample() {
  const tableInstance = useRef(null);
  const [dataViews, setDataViews] = useState(defaultDataViews);
  const [currentView, setCurrentView] = useState(defaultDataViews[0]);
  const [rowData, setRowData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(null);

  const toggleView = (view) => {
    if (view.id !== currentView.id) {
      setRendered(false);
      setCurrentView(view);
    }
  };

  const addView = (dataview) => {
    const newView = {
      id: dataViews.length + 1,
      kind: dataview.kind,
      name: `New ${dataview.name}`,
      fields: [],
    };
    setDataViews((prevDataViews) => [...prevDataViews, newView]);
    setCurrentView(newView);
  };

  const updateView = async (currentView, props) => {
    setIsAutoSaving('in-progress');
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

  return (
    <DataManagerNext
      // isAutoSaving={isAutoSaving}
      key={`table-for-${currentView.id}`}
      onItemClick={console.log}
      columnDefs={columnDefsNext}
      currentView={currentView}
      updateView={updateView}
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
                    className="px-3 bg-white border-bottom"
                    style={{ zIndex: 30 }}
                  >
                    <div style={{ width: 300 }}>
                      <Form>
                        <Select
                          layout="elementOnly"
                          name="dataView"
                          isClearable={false}
                          value={currentView.id}
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
                            toggleView(option);
                          }}
                        />
                      </Form>
                    </div>
                    <More />
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
                            rowHeight: 104,
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
    </DataManagerNext>
  );
}

export default function Cube() {
  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <IntlProvider locale="en">
        <Router>
          <CubeExample />
        </Router>
      </IntlProvider>
    </CubeProvider>
  );
}
