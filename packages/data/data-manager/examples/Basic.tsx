import Button from '@uidu/button';
import { More } from '@uidu/data-controls';
import { buildNextColumns } from '@uidu/data-fields';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Form, { useForm } from '@uidu/form';
import { ButtonItem, MenuGroup } from '@uidu/menu';
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
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PlusCircle } from 'react-feather';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import DataManager, {
  DataManagerControls,
  DataManagerFooter,
  DataManagerView,
  useReactTable,
} from '../';
import '../../calendar/themes/uidu.scss';
import { byName } from '../../data-views/src';
import { availableColumns, fetchContacts } from '../../table/examples-utils';
import '../../table/themes/uidu.scss';
import { defaultDataViews } from '../examples-utils';

export default function Basic({}) {
  const [dataViews, setDataViews] = useState(defaultDataViews);
  const [currentView, setCurrentView] = useState(defaultDataViews[0]);
  const [rowData, setRowData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(null);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const form = useForm({});

  const toggleView = useCallback((view) => {
    if (view.id !== currentView.id) {
      setRendered(false);
      setCurrentView(view);
    }
  }, []);

  const addView = useCallback((dataview) => {
    const newView = {
      id: dataViews.length + 1,
      kind: dataview.kind,
      name: `New ${dataview.name}`,
      fields: [],
    };
    setDataViews((prevDataViews) => [...prevDataViews, newView]);
    setCurrentView(newView);
  }, []);

  useEffect(() => {
    fetchContacts().then((response) => {
      setLoaded(true);
      setRowData(response);
    });
  }, []);

  const loadNext = () => {
    setIsLoadingNext(true);
    fetchContacts(3000).then((response) => {
      setIsLoadingNext(false);
      setRowData((prev) => [...prev, ...response]);
    });
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

  const data = useMemo(() => rowData, [rowData]);

  const columns = useMemo(
    () =>
      buildNextColumns([
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
      ]),
    [],
  );

  const onItemClick = useCallback((row) => {
    console.log(row);
  }, []);

  const tableInstance = useReactTable<(typeof data)[0]>({
    data,
    columns,
  });

  const schema = useMemo(
    () => [
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
                    trigger={<Button appearance="primary">Add a view</Button>}
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
    ],
    [addView, currentView.id, dataViews, toggleView],
  );

  return (
    <IntlProvider locale="en">
      <Router>
        <>
          <ShellSidebar tw="w-80 border-r hidden md:flex">
            <Navigation tw="bg-white border-b" schema={schema} />
          </ShellSidebar>
          <ShellMain>
            {!loaded ? (
              <ShellBodyWithSpinner />
            ) : (
              <ShellBody>
                {!loaded ? (
                  <ShellBodyWithSpinner />
                ) : (
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
                        <Form form={form}>
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
                      <DataManagerControls
                        tableInstance={tableInstance}
                        currentView={currentView}
                      />
                    </ShellHeader>
                    <DataManager
                      // query={query}
                      pagination={{
                        hasNext: true,
                        isLoadingNext,
                        loadNext,
                      }}
                      contextMenu={({ row }) => (
                        <MenuGroup>
                          <ButtonItem
                            onClick={() => window.alert('onClick row')}
                          >
                            text for {row.original.email}
                          </ButtonItem>
                          <ButtonItem>Test</ButtonItem>
                        </MenuGroup>
                      )}
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
                                component: (p) => (
                                  <ButtonItem {...p}>Test</ButtonItem>
                                ),
                                onClick: () => window.alert('onClick row'),
                              },
                            ],
                          },
                        ];
                      }}
                      isAutoSaving={isAutoSaving}
                      key={`table-for-${currentView.id}`}
                      // onItemClick={onItemClick}
                      tableInstance={tableInstance}
                      currentView={currentView}
                      updateView={onViewUpdate}
                    >
                      <ShellBody>
                        <Suspense fallback={<ShellBodyWithSpinner />}>
                          <DataManagerView
                            viewProps={{
                              gallery: {
                                gutterSize: 24,
                              },
                              list: {
                                rowHeight: 104,
                              },
                              calendar: {
                                components: {
                                  event: (props) => (
                                    <div tw="bg-red-500 my-0.5">Ciao</div>
                                  ),
                                  month: {
                                    event: (props) => (
                                      <div tw="bg-red-500 my-0.5">
                                        {props.title}
                                      </div>
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
                        </Suspense>
                      </ShellBody>
                      <DataManagerFooter />
                    </DataManager>
                  </ShellMain>
                )}
              </ShellBody>
            )}
          </ShellMain>
        </>
      </Router>
    </IntlProvider>
  );
}
