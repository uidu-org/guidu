import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import Button from '@uidu/button';
import { More } from '@uidu/data-controls';
import { buildNextColumns } from '@uidu/data-fields';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Form from '@uidu/form';
import { ButtonItem } from '@uidu/menu';
import Select from '@uidu/select';
import { ShellBody, ShellHeader, ShellMain, ShellSidebar } from '@uidu/shell';
import Navigation from '@uidu/side-navigation';
import { HeaderSelection, RowSelection } from '@uidu/table';
import { isEqual } from 'lodash';
import Papa from 'papaparse';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import DataManager, {
  DataManagerControls,
  DataManagerFooter,
  DataManagerView,
} from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { fetchContacts } from '../../table/examples-utils';
import '../../table/themes/uidu.scss';
import { defaultDataViews } from '../examples-utils';

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

function App({ currentView, setCurrentView }) {
  const [dataViews, setDataViews] = useState(defaultDataViews);
  const [isAutoSaving, setIsAutoSaving] = useState(null);

  return (
    <>
      <ShellMain>
        <ShellMain>
          <ShellHeader tw="px-4 bg-white border-b" style={{ zIndex: 30 }}>
            {/* <input
                                  type="search"
                                  className="mr-2 form-control"
                                  placeholder="Search"
                                  onChange={(e) =>
                                    tableInstance.current.setGlobalFilter(
                                      e.target.value,
                                    )
                                  }
                                /> */}
            {/* <button
                                  onClick={() => {
                                    tableInstance.current.exportData(
                                      'csv',
                                      true,
                                    );
                                  }}
                                >
                                  Export All as CSV
                                </button> */}
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
                        <div
                          style={{ background: color }}
                          tw="p-0.5 rounded flex items-center justify-center flex-grow"
                        >
                          <Icon size={12} color="#fff" />
                        </div>
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
            <DataManagerControls />
          </ShellHeader>
          <ShellBody>
            <ShellMain>
              <DataManagerView
                onItemClick={(p) => console.log(p)}
                viewProps={{
                  gallery: {
                    gutterSize: 24,
                  },
                  list: {
                    rowHeight: 64,
                    gutterSize: 8,
                  },
                  calendar: {
                    components: {
                      event: (props) => <div tw="bg-red-500 my-0.5">Ciao</div>,
                      month: {
                        event: (props) => (
                          <div tw="bg-red-500 my-0.5">{props.title}</div>
                        ),
                      },
                    },
                  },
                  board: {},
                  table: {
                    includeFooter: false,
                    headerHeight: 48,
                    rowHeight: 48,
                  },
                }}
              />
            </ShellMain>
          </ShellBody>
          <DataManagerFooter />
        </ShellMain>
      </ShellMain>
    </>
  );
}

export default function Basic({}) {
  const tableInstance = useRef<Table<T>>(null);
  const [dataViews, setDataViews] = useState(defaultDataViews);
  const [currentView, setCurrentView] = useState(defaultDataViews[0]);
  const [rowData, setRowData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(null);

  const data = useMemo(() => rowData, [rowData]);

  const columnHelper = createColumnHelper<any>();

  const columns: ColumnDef<any>[] = [
    // Display Column
    columnHelper.display({
      id: 'selection',
      size: 64,
      maxSize: 64,
      header: (props) => <HeaderSelection {...props} />,
      cell: (props) => <RowSelection {...props} />,
      meta: { pinned: 'left' },
    }),
    // Accessor Column
    columnHelper.accessor('displayName', {
      footer: (props) => props.column.id,
      meta: {
        name: 'Display name',
        kind: 'string',
      },
    }),
    // Accessor Column
    columnHelper.accessor((row) => row.email, {
      id: 'email',
      meta: { name: 'Email', kind: 'email' },
      footer: (props) => props.column.id,
    }),
    // Accessor Column
    columnHelper.accessor('age', {
      footer: (props) => props.column.id,
      meta: {
        kind: 'number',
        name: 'Age',
        valueFormatter: (value) => value / 100,
      },
    }),
    columnHelper.accessor('phone', {
      footer: (props) => props.column.id,
      meta: { kind: 'phone', name: 'phone' },
    }),
    columnHelper.accessor('gender', {
      enableGrouping: true,
      meta: {
        kind: 'singleSelect',
        name: 'Gender',
        options: [
          { id: 'male', name: 'male' },
          { id: 'female', name: 'female' },
        ],
      },
    }),
    // Accessor Column
    columnHelper.accessor('country', {
      meta: { name: 'Country', kind: 'country' },
      footer: (props) => props.column.id,
    }),
    // Accessor Column
    columnHelper.accessor('status', {
      meta: { name: 'Status', kind: 'string' },
      footer: (props) => props.column.id,
    }),
    // Accessor Column
    columnHelper.accessor('progress', {
      meta: { name: 'Profile progress', kind: 'progress' },
      footer: (props) => props.column.id,
    }),
  ];

  useEffect(() => {
    fetchContacts().then((response) => {
      setLoaded(true);
      setRowData(response);
    });
  }, []);

  const toggleView = (view) => {
    if (view.id !== currentView.id) {
      // setRendered(false);
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

  const onViewUpdate = async (name, value) => {
    console.log(name, value);
    if (!isEqual(currentView[name], value)) {
      setIsAutoSaving('in-progress');
      const updatedView = {
        ...currentView,
        [name]: value,
      };
      setDataViews((prevDataViews) =>
        prevDataViews.map((item) => {
          if (item.id !== currentView.id) {
            return item;
          }
          return {
            ...item,
            [name]: value,
          };
        }),
      );
      setCurrentView(updatedView);
      setIsAutoSaving('done');
      return updatedView;
    }
  };

  return (
    <IntlProvider locale="en">
      <Router>
        <DataManager
          forwardedRef={tableInstance}
          // query={query}
          actions={(row: any) => {
            return [
              {
                name: 'Default actions',
                items: [
                  {
                    children: `text for ${row.original.email}`,
                    onClick: () => window.alert('onClick row'),
                  },
                  {
                    component: (p) => <ButtonItem {...p}>Test</ButtonItem>,
                    onClick: () => window.alert('onClick row'),
                  },
                ],
              },
            ];
          }}
          isAutoSaving={isAutoSaving}
          key={`table-for-${currentView.id}`}
          columns={buildNextColumns([
            {
              kind: 'default',
              name: 'Default fields',
              columns,
            },
          ])}
          rowData={data}
          currentView={currentView}
          // updateView={onViewUpdate}
          getExportFileBlob={getExportFileBlob}
          options={{
            onColumnFiltersChange: (updater) => {
              const columnFilters =
                typeof updater === 'function'
                  ? updater(tableInstance.current?.getState().columnFilters!)
                  : updater;
              console.log(columnFilters);
              tableInstance.current?.setState((old) => ({
                ...old,
                columnFilters,
              }));
            },
          }}
        >
          <>
            <ShellSidebar tw="w-80 border-r">
              <Navigation
                tw="bg-white border-b"
                schema={[
                  {
                    type: 'NavigationHeader',
                    text: 'Team',
                  },
                  {
                    type: 'NavigationSection',
                    items: [
                      {
                        type: 'NavigationGroup',
                        items: [
                          ...dataViews.map((dataView) => {
                            const d = byName[dataView.kind];
                            const { icon: Icon, color } = d;
                            return {
                              id: dataView.id,
                              key: dataView.id,
                              text: dataView.name,
                              before: (
                                <div
                                  style={{ background: color }}
                                  tw="p-0.5 rounded flex items-center justify-center flex-grow"
                                >
                                  <Icon size={12} color="#fff" />
                                </div>
                              ),
                              onClick: () => toggleView(dataView),
                              type: 'NavigationItem',
                              ...(currentView.id === dataView.id
                                ? { className: 'active' }
                                : {}),
                            };
                          }),
                        ],
                      },
                      {
                        type: 'NavigationGroup',
                        items: [
                          {
                            type: 'InlineComponent',
                            component: () => (
                              <DropdownMenu
                                trigger={
                                  <Button appearance="primary">
                                    Add a view
                                  </Button>
                                }
                                position="bottom left"
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
                                      id: 5,
                                      kind: 'list',
                                      name: 'List',
                                    },
                                  ].map((view) => (
                                    <DropdownItem
                                      key={view.id}
                                      onClick={() => addView(view)}
                                      elemBefore={<PlusCircle size={14} />}
                                    >
                                      Add a {view.kind} view
                                    </DropdownItem>
                                  ))}
                                </DropdownItemGroup>
                              </DropdownMenu>
                            ),
                          },
                        ],
                      },
                    ],
                  },
                ]}
              />
            </ShellSidebar>
            <ShellMain>
              {loaded && (
                <App
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                  toggleView={toggleView}
                />
              )}
            </ShellMain>
          </>
        </DataManager>
      </Router>
    </IntlProvider>
  );
}
