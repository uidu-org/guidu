import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { More } from '@uidu/data-controls';
import Form from '@uidu/form';
import Select from '@uidu/select';
import { ShellBody, ShellHeader, ShellMain } from '@uidu/shell';
import { isEqual } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import 'react-big-calendar/lib/sass/styles';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { columnDefsNext } from '../../table/examples-utils';
import {
  DataManagerControls,
  DataManagerCube,
  DataManagerFooter,
  DataManagerView,
} from '../src';

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
    preferences: {
      primaryField: 'Grants.name',
      startDateField: 'Grants.publishedAt',
      endDateField: 'Grants.expiresAt',
    },
    fields: ['avatar', 'member', 'amount'],
    query: {
      dimensions: [
        'ProposalGrants.id',
        'Grants.publishedAt',
        'Grants.name',
        'Grants.expiresAt',
        'ProposalGrants.status',
        'GrantMakers.id',
        'Organizations.id',
        'Organizations.name',
        'Organizations.avatar',
        'ProposalGrants.createdAt',
      ],
      segments: ['ProposalGrants.notDiscarded'],
    },
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
  const resultSet = useRef(null);
  const [dataViews, setDataViews] = useState(defaultDataViews);
  const [currentView, setCurrentView] = useState(defaultDataViews[0]);
  const [rendered, setRendered] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(null);

  const toggleView = (view) => {
    if (view.id !== currentView.id) {
      setRendered(false);
      setCurrentView(view);
    }
  };

  const onViewUpdate = useCallback(
    (state) => {
      if (!isEqual(currentView.state, state)) {
        setIsAutoSaving('in-progress');
        const updatedView = {
          ...currentView,
          ...state,
        };
        setDataViews((prevDataViews) =>
          prevDataViews.map((item) => {
            if (item.id !== currentView.id) {
              return item;
            }
            return {
              ...item,
              state,
            };
          }),
        );
        setCurrentView(updatedView);
        setIsAutoSaving('done');
        return updatedView;
      }
    },
    [currentView],
  );

  return (
    <DataManagerCube
      // isAutoSaving={isAutoSaving}
      key={`table-for-${currentView.id}`}
      columnDefs={columnDefsNext}
      currentView={currentView}
      onItemClick={console.log}
      onViewUpdate={onViewUpdate}
      onReady={(result) => {
        resultSet.current = result;
      }}
    >
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
                  <DataManagerControls />
                  <div>
                    <button onClick={() => resultSet.current.refetch()}>
                      Refetch
                    </button>
                  </div>
                </ShellHeader>
                <ShellBody>
                  <ShellMain>
                    <DataManagerView
                      viewProps={{
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
                      }}
                    />
                  </ShellMain>
                </ShellBody>
                <DataManagerFooter />
              </ShellMain>
            </>
          </ShellBody>
        </>
      </ShellMain>
    </DataManagerCube>
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
