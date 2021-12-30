import Button from '@uidu/button';
import { More } from '@uidu/data-controls';
import { buildColumns } from '@uidu/data-fields';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Form from '@uidu/form';
import Select from '@uidu/select';
import {
  ShellBody,
  ShellBodyWithSpinner,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import Navigation from '@uidu/side-navigation';
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
import DataManager, {
  DataManagerControls,
  DataManagerFooter,
  DataManagerView,
} from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { availableColumns, fetchContacts } from '../../table/examples-utils';
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
      setLoaded(true);
      setRowData(response);
    });
  }, []);

  const onViewUpdate = async (name, value) => {
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

  const data = useMemo(() => rowData, [rowData]);

  const onItemSelect = useCallback((rows) => {}, []);

  return (
    <IntlProvider locale="en">
      <Router>
        <DataManager
          forwardedRef={tableInstance}
          // query={query}
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
          onItemSelect={onItemSelect}
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
          updateView={onViewUpdate}
          getExportFileBlob={getExportFileBlob}
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
                        path: `/`,
                        type: 'InlineComponent',
                        component: () => (
                          <DropdownMenu
                            trigger={
                              <Button appearance="primary">Add a view</Button>
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
                        icon: (
                          <img
                            src="https://via.placeholder.com/24x24"
                            tw="rounded-full"
                          />
                        ),
                      },
                    ],
                  },
                ]}
              />
            </ShellSidebar>
            <ShellMain>
              {!loaded ? (
                <ShellBodyWithSpinner />
              ) : (
                <>
                  <ShellBody>
                    {!loaded ? (
                      <ShellBodyWithSpinner />
                    ) : (
                      <>
                        <ShellMain>
                          <ShellHeader
                            tw="px-4 bg-white border-b"
                            style={{ zIndex: 30 }}
                          >
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
                                    rowHeight: 104,
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
                      </>
                    )}
                  </ShellBody>
                </>
              )}
            </ShellMain>
          </>
        </DataManager>
      </Router>
    </IntlProvider>
  );
}
