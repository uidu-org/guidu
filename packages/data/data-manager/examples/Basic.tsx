import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { More } from '@uidu/data-controls';
import { buildColumns } from '@uidu/data-fields';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Form from '@uidu/form';
import Navigation from '@uidu/navigation';
import Select from '@uidu/select';
import {
  ShellBody,
  ShellBodyWithSpinner,
  ShellHeader,
  ShellMain,
} from '@uidu/shell';
import { isEqual } from 'lodash';
import Papa from 'papaparse';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'react-big-calendar/lib/sass/styles';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import DataManager from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { availableColumns, fetchContacts } from '../../table/examples-utils';
import '../../table/themes/uidu.scss';
import { defaultDataViews } from '../examples-utils';

const API_URL = 'http://localhost:4000';
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI3NzI0NTUsImV4cCI6MTYwMjg1ODg1NX0.wbsfpkQUIYev_s83VanR4f1YRWUCmUIST3SHd22o5Ug';
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`,
});

const query = {
  timeDimensions: [
    {
      dimension: 'Orders.createdAt',
      // dateRange: [startDate, finishDate],
      granularity: 'day',
    },
  ],
  // order: {
  //   [`${sorting[0]}`]: sorting[1],
  // },
  dimensions: [
    'Users.id',
    'Orders.id',
    'Orders.size',
    'Users.fullName',
    'Users.city',
    'Orders.price',
    'Orders.status',
    'Orders.createdAt',
  ],
  // filters: [
  //   {
  //     dimension: 'Orders.status',
  //     operator: tabs[statusFilter] !== 'All' ? 'equals' : 'set',
  //     values: [`${tabs[statusFilter].toLowerCase()}`],
  //   },
  //   {
  //     dimension: 'Orders.price',
  //     operator: 'gt',
  //     values: [`${priceFilter[0]}`],
  //   },
  //   {
  //     dimension: 'Orders.price',
  //     operator: 'lt',
  //     values: [`${priceFilter[1]}`],
  //   },
  // ],
};

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === 'csv') {
    // CSV example
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: 'text/csv' });
  }
  //  else if (fileType === 'xlsx') {
  //   // XLSX example

  //   const header = columns.map((c) => c.exportValue);
  //   const compatibleData = data.map((row) => {
  //     const obj = {};
  //     header.forEach((col, index) => {
  //       obj[col] = row[index];
  //     });
  //     return obj;
  //   });

  //   let wb = XLSX.utils.book_new();
  //   let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
  //     header,
  //   });
  //   XLSX.utils.book_append_sheet(wb, ws1, 'React Table Data');
  //   XLSX.writeFile(wb, `${fileName}.xlsx`);

  //   // Returning false as downloading of file is already taken care of
  //   return false;
  // }
  // //PDF example
  // if (fileType === 'pdf') {
  //   const headerNames = columns.map((column) => column.exportValue);
  //   const doc = new JsPDF();
  //   doc.autoTable({
  //     head: [headerNames],
  //     body: data,
  //     margin: { top: 20 },
  //     styles: {
  //       minCellHeight: 9,
  //       halign: 'left',
  //       valign: 'center',
  //       fontSize: 11,
  //     },
  //   });
  //   doc.save(`${fileName}.pdf`);

  //   return false;
  // }

  // Other formats goes here
  return false;
}

export default function Basic({}) {
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

  useEffect(() => {
    fetchContacts().then((response) => {
      console.log(response);
      setLoaded(true);
      setRowData(response);
    });
  }, []);

  const onViewUpdate = useCallback(
    (state) => {
      console.log(state);
      if (!isEqual(currentView.state, state)) {
        setIsAutoSaving('in-progress');
        const updatedView = {
          ...currentView,
          state,
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

  console.log(tableInstance.current);

  const data = useMemo(() => rowData, [rowData]);

  return (
    <CubeProvider cubejsApi={cubejsApi}>
      <IntlProvider locale="en">
        <Router>
          <DataManager
            forwardedRef={tableInstance}
            query={query}
            actions={[
              {
                name: 'Default actions',
                items: [
                  {
                    children: 'text',
                    onClick: () => window.alert('onClick row'),
                  },
                  {
                    children: 'text',
                    onClick: () => window.alert('onClick row'),
                  },
                ],
              },
            ]}
            isAutoSaving={isAutoSaving}
            key={`table-for-${currentView.id}`}
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
            rowData={data}
            currentView={currentView}
            onViewUpdate={onViewUpdate}
            getExportFileBlob={getExportFileBlob}
            // onGridReady={() => this.setState({ rendered: true })}
          >
            {({ renderControls, renderView, renderSidebar }) => (
              <ShellMain>
                <Navigation
                  className="bg-white border-bottom"
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
                                    onClick={() => addView(view)}
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
                              <input
                                type="search"
                                className="form-control mr-2"
                                placeholder="Search"
                                onChange={(e) =>
                                  tableInstance.current.setGlobalFilter(
                                    e.target.value,
                                  )
                                }
                              />
                              <button
                                onClick={() => {
                                  tableInstance.current.exportData('csv', true);
                                }}
                              >
                                Export All as CSV
                              </button>
                              <div style={{ width: 300, flexShrink: 0 }}>
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
                                        before: (
                                          <Icon size={16} color={color} />
                                        ),
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
                                      includeFooter: false,
                                      headerHeight: 48,
                                      rowHeight: 40,
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
    </CubeProvider>
  );
}
