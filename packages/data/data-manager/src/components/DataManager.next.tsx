/* eslint-disable react/jsx-props-no-spreading */

import { CubeContext, useCubeQuery } from '@cubejs-client/react';
import { ControlsSkeleton, Finder } from '@uidu/data-controls';
import { buildColumns } from '@uidu/data-fields';
import { byName } from '@uidu/data-views';
import { ShellBodyWithSpinner } from '@uidu/shell';
import {
  Aggregated,
  AggregatedSelection,
  Header,
  HeaderSelection,
  RowActions,
  RowSelection,
} from '@uidu/table';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  useAsyncDebounce,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { useExportData } from 'react-table-plugins';
import { DataManagerNextProps } from '../types';
import DataView from './DataView';
import DataViewSidebar from './DataViewSidebar';

const defaultAvailableControls = {
  calendarToolbar: {
    visible: true,
    props: {},
  },
  finder: {
    visible: true,
    props: {},
  },
  viewer: {
    visible: true,
    props: {},
  },
  grouper: {
    visible: true,
    props: {},
  },
  filterer: {
    visible: true,
    props: {},
  },
  sorter: {
    visible: true,
    props: {},
  },
  more: {
    visible: true,
    props: {},
  },
};

const defaultRowHeight = 56;
const defaultColumnCount = 4;
const defaultStartDateField = 'createdAt';
const defaultEndDateField = null;
const defaultPrimaryField = null;

function DataManagerComponent({
  children,
  resultSet,
  columnDefs,
  onItemClick,
  onItemSelect = () => {},
  onViewUpdate = () => {},
  currentView,
  updateView,
  actions = [],
  canSelectRows = true,
  forwardedRef,
  getExportFileBlob,
}: DataManagerNextProps) {
  const columns = useMemo(
    () =>
      buildColumns([
        {
          kind: 'default',
          name: 'Default fields',
          columns: resultSet.tableColumns().map((c) => {
            console.log(c.key);
            console.log(columnDefs[c.key]);
            return {
              ...c,
              field: c.key,
              id: c.key,
              accessor: (row) => row[c.key],
              name: c.title,
              kind: c.meta ? c.meta.kind : 'string',
              fieldGroup: 'default',
              ...columnDefs[c.key],
            };
          }),
        },
      ]),
    [resultSet],
  );

  const data = useMemo(() => resultSet.tablePivot(), [resultSet]);

  const setColumnCount = (columnCount) => {
    onViewUpdate({
      preferences: { ...currentView.preferences, columnCount },
    });
    // .then(() => {
    //   setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    // });
  };

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 80,
      width: 200,
      maxWidth: 400,
      canHide: true,
      canSortBy: true,
      canGroupBy: false,
      Header,
      Aggregated,
      Cell: ({ column, value }) =>
        column.valueFormatter ? (
          <>{column.valueFormatter({ value })}</>
        ) : (
          value || null
        ),
    }),
    [],
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        ...(currentView?.state || {}),
      },
      getExportFileBlob,
    },
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useResizeColumns,
    useExpanded,
    useRowSelect,
    useExportData,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...(canSelectRows
          ? [
              {
                id: 'uid',
                kind: 'uid',
                field: 'id',
                disableResizing: true,
                minWidth: 56,
                width: 56,
                maxWidth: 56,
                pinned: 'left',
                groupByBoundary: true,
                cellStyle: {
                  padding: 0,
                },
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: HeaderSelection,
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: RowSelection,
                Aggregated: AggregatedSelection,
                Footer: (info) => {
                  // Only calculate total visits if rows change

                  return <>Total: {info.rows.length}</>;
                },
              },
            ]
          : []),
        ...columns,
        ...(actions.length > 0
          ? [
              {
                id: 'actions',
                kind: 'actions',
                suppressMenu: true,
                disableResizing: true,
                minWidth: 56,
                width: 56,
                maxWidth: 56,
                pinned: 'right',
                Cell: (foo) => <RowActions {...foo} actions={actions} />,
                groupByBoundary: true,
                cellStyle: {
                  padding: 0,
                },
              },
            ]
          : []),
      ]);
    },
  );

  useImperativeHandle(forwardedRef, () => tableInstance, [tableInstance]);

  const {
    state,
    setGlobalFilter,
    globalFilter,
    selectedFlatRows,
  } = tableInstance;

  const onViewUpdateDebounce = useAsyncDebounce(onViewUpdate, 100);
  const onItemSelectDebounce = useAsyncDebounce(onItemSelect, 100);

  useEffect(() => {
    onViewUpdateDebounce({ state });
  }, [state, onViewUpdateDebounce]);

  useEffect(() => {
    onItemSelectDebounce({ state: { ...state, selectedFlatRows } });
  }, [selectedFlatRows, onItemSelectDebounce]);

  const setAggregation = (column, aggregate) => {};

  const setColumnWidth = (column, width: number) => {};

  const renderView = ({
    viewProps = {
      board: {},
      calendar: {},
      gallery: {},
      list: {},
      table: {},
    },
  }) => {
    if (!currentView) {
      return <ShellBodyWithSpinner />;
    }

    const {
      preferences = {
        rowHeight: defaultRowHeight,
        columnCount: defaultColumnCount,
        startDateField: defaultStartDateField,
        endDateField: defaultEndDateField,
        primaryField: defaultPrimaryField,
      },
    } = currentView;

    const {
      rowHeight,
      columnCount,
      startDateField,
      endDateField,
      primaryField,
    } = preferences;

    return (
      <DataView
        {...state}
        setAggregation={setAggregation}
        setColumnWidth={setColumnWidth}
        // methods
        // onFilterChanged={this.onFilterChanged}
        // onSortChanged={this.onSortChanged}
        // onColumnVisible={this.onColumnVisible}
        // onColumnRowGroupChanged={this.onColumnRowGroupChanged}
        // onDragStopped={this.onDragStopped}
        // onColumnResized={this.onColumnResized}
        // onRowGroupOpened={this.onRowGroupOpened}
        // props spreading
        columnDefs={columnDefs}
        rowData={data}
        onItemClick={onItemClick}
        currentView={currentView}
        // onAddField={onAddField}
        viewProps={viewProps}
        tableInstance={tableInstance}
        data={data}
        columns={columns}
        rowHeight={rowHeight}
        columnCount={columnCount}
        startDateField={startDateField}
        endDateField={endDateField}
        primaryField={primaryField}
      />
    );
  };

  const renderSidebar = () => {
    return <DataViewSidebar currentView={currentView} data={data} />;
  };

  const renderControls = ({ controls }) => {
    const availableControls = {
      ...defaultAvailableControls,
      ...controls,
    };

    if (!currentView) {
      return <ControlsSkeleton />;
    }

    const {
      preferences = {
        rowHeight: defaultRowHeight,
        columnCount: defaultColumnCount,
        startDateField: defaultStartDateField,
        endDateField: defaultEndDateField,
        primaryField: defaultPrimaryField,
      },
    } = currentView;

    const {
      rowHeight,
      columnCount,
      startDateField,
      endDateField,
      primaryField,
    } = preferences;

    const { icon: Icon, color, controls: Controls = () => null } = byName[
      currentView.kind
    ];

    return (
      <>
        <Controls
          tableInstance={tableInstance}
          isConfiguratorOpen={availableControls.viewer.isConfiguratorOpen}
          availableControls={availableControls}
          currentView={currentView}
          updateView={updateView}
          columnDefs={columns}
          // onDragEnd={this.moveColumn}
          // onResize={this.setRowHeight}
          rowHeight={rowHeight}
          // onDownload={() => this.gridApi.exportDataAsCsv()}
          columnCount={columnCount}
          onSetColumnCount={setColumnCount}
          actions={availableControls.more.actions}
          // isAutoSaving={isAutoSaving}
          startDateField={startDateField}
          endDateField={endDateField}
          primaryField={primaryField}
        />
        {availableControls.finder.visible && (
          <Finder
            onChange={(e) => setGlobalFilter(e.target.value)}
            {...availableControls.finder.props}
          />
        )}
      </>
    );
  };

  return (children as any)({
    renderControls,
    renderView,
    renderSidebar,
  });
}

export default function DataManager({
  columnDefs,
  currentView,
  children,
  onViewUpdate,
  isAutoSaving,
  ...rest
}) {
  const { cubejsApi } = useContext(CubeContext);
  const { query } = currentView;

  const { resultSet, error, isLoading } = useCubeQuery(query, { cubejsApi });
  if (error) {
    return <p>Query is invalid</p>;
  }

  if (!resultSet) {
    return null;
  }

  return (
    <DataManagerComponent
      {...rest}
      isLoading={isLoading}
      resultSet={resultSet}
      columnDefs={columnDefs}
      children={children}
      currentView={currentView}
      onViewUpdate={onViewUpdate}
      isAutoSaving={isAutoSaving}
    />
  );
}
