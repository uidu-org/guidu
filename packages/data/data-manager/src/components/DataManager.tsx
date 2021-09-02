/* eslint-disable react/jsx-props-no-spreading */
import { ControlsSkeleton, Finder } from '@uidu/data-controls';
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
import React, { useEffect, useImperativeHandle } from 'react';
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
import { DataManagerProps } from '../types';
import DataView from './DataView';
import DataViewFooter from './DataViewFooter';
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
  columnDefs: columns,
  onItemClick,
  onItemSelect = () => {},
  onViewUpdate = () => {},
  currentView,
  updateView,
  actions = [],
  canSelectRows = true,
  forwardedRef,
  getExportFileBlob,
}: DataManagerProps) {
  const setColumnCount = (columnCount) => {
    onViewUpdate(currentView, {
      preferences: { ...currentView.preferences, columnCount },
    }).then(() => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    });
  };

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 80,
      width: 240,
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
      data: rowData,
      defaultColumn,
      initialState: {
        ...(currentView?.state || {}),
      },
      // useControlledState: (state) => {
      //   return React.useMemo(
      //     () => ({
      //       ...state,
      //       columnDefinitions,
      //     }),
      //     [state],
      //   );
      // },
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
                Header: (props) =>
                  props.headerGroups.length > 1 ? null : (
                    <HeaderSelection {...props} />
                  ),
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

  const { state, setGlobalFilter, globalFilter, selectedFlatRows } =
    tableInstance;

  const onViewUpdateDebounce = useAsyncDebounce(onViewUpdate, 100);
  const onItemSelectDebounce = useAsyncDebounce(onItemSelect, 100);

  useEffect(() => {
    onViewUpdateDebounce(state);
  }, [state, onViewUpdateDebounce]);

  useEffect(() => {
    onItemSelectDebounce(selectedFlatRows);
  }, [selectedFlatRows, onItemSelectDebounce]);

  const setAggregation = (column, aggregate) => {
    console.log(column);
    // const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    // setColumnDefinitions([
    //   ...columnDefinitions.slice(0, index),
    //   {
    //     ...columnDefinitions[index],
    //     aggregate,
    //   },
    //   ...columnDefinitions.slice(index + 1),
    // ]);
  };

  const setColumnWidth = (column, width: number) => {
    console.log(column);
    // const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    // setColumnDefinitions([
    //   ...columnDefinitions.slice(0, index),
    //   {
    //     ...columnDefinitions[index],
    //     width,
    //   },
    //   ...columnDefinitions.slice(index + 1),
    // ]);
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
        // props spreading
        rowData={rowData}
        onItemClick={onItemClick}
        currentView={currentView}
        // onAddField={onAddField}
        viewProps={viewProps}
        tableInstance={tableInstance}
        data={rowData}
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
    return <DataViewSidebar currentView={currentView} data={rowData} />;
  };

  const renderFooter = () => {
    return <DataViewFooter tableInstance={tableInstance} />;
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

    const {
      icon: Icon,
      color,
      controls: Controls = () => null,
    } = byName[currentView.kind];

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
    renderFooter,
  });
}
