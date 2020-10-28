/* eslint-disable react/jsx-props-no-spreading */
import { ControlsSkeleton, Finder } from '@uidu/data-controls';
import { byName } from '@uidu/data-views';
import { ShellBodyWithSpinner } from '@uidu/shell';
import {
  Aggregated,
  AggregatedSelection,
  Header,
  HeaderSelection,
  RowSelection,
} from '@uidu/table';
import React, { useMemo, useState } from 'react';
import {
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { DataManagerProps } from '../types';
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

export default function DataManager({
  children,
  rowData = [],
  columnDefs,
  onItemClick,
  currentView,
  updateView: onViewUpdate,
}: DataManagerProps) {
  const [columnDefinitions, setColumnDefinitions] = useState(columnDefs);
  const data = useMemo(() => rowData, [rowData]);
  const columns = useMemo(() => columnDefinitions, [columnDefinitions]);

  const setColumnCount = (columnCount) => {
    updateView({
      preferences: { ...currentView.preferences, columnCount },
    }).then(() => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    });
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
        pageSize: 100,
        ...(currentView?.state || {}),
      },
      useControlledState: (state) => {
        return React.useMemo(
          () => ({
            ...state,
            ...currentView?.state,
            columnDefinitions,
          }),
          [state],
        );
      },
    },
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useResizeColumns,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
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
        ...columns,
      ]);
    },
  );

  const { state, setGlobalFilter, globalFilter } = tableInstance;

  const updateView = () => {
    return onViewUpdate(currentView, state);
  };

  const setColumnState = (column, newState = {}) => {
    const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    setColumnDefinitions([
      ...columnDefinitions.slice(0, index),
      {
        ...columnDefinitions[index],
        ...newState,
      },
      ...columnDefinitions.slice(index + 1),
    ]);
  };

  const setAggregation = (column, aggregate) => {
    const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    setColumnDefinitions([
      ...columnDefinitions.slice(0, index),
      {
        ...columnDefinitions[index],
        aggregate,
      },
      ...columnDefinitions.slice(index + 1),
    ]);
  };

  const setColumnWidth = (column, width: number) => {
    const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    setColumnDefinitions([
      ...columnDefinitions.slice(0, index),
      {
        ...columnDefinitions[index],
        width,
      },
      ...columnDefinitions.slice(index + 1),
    ]);
  };

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
        rowData={rowData}
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
        {/* {availableControls.viewer.visible && (
          <Viewer
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
        )} */}
        <div className="d-flex align-items-center ml-3 flex-grow-1">
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
        </div>
      </>
    );
  };

  return (children as any)({
    renderControls,
    renderView,
    renderSidebar,
  });
}
