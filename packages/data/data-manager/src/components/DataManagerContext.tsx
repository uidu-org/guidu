import { Cell, Column, Row, Table } from '@tanstack/react-table';
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface DataManagerPassedDownProps<TTable, TView extends {}> {
  tableInstance: Table<TTable>;
  columns: Column<TTable, unknown>[];
  onItemClick: (item: TTable) => void;
  currentView?: TView;
  updateView?: (name: string, value: any) => Promise<any>;
  contextMenu?: FC<{
    row: Row<TTable>;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
  }>;
  pagination?: {
    isLoadingNext?: boolean;
    loadNext?: () => void;
    hasNext?: boolean;
  };
}

interface DataManagerContextProps<TTable, TView extends {}>
  extends DataManagerPassedDownProps<TTable, TView> {
  columnCount?: number;
  setAggregation?: () => void;
  setColumnCount?: (columnCount: number) => void;
  setColumnWidth?: (column: any) => void;
  selectedCell?: Cell<TTable, unknown>['id'];
  setSelectedCell?: Dispatch<
    SetStateAction<Cell<TTable, unknown>['id'] | null>
  >;
  editingCell?: Cell<TTable, unknown>;
  setEditingCell?: Dispatch<SetStateAction<Cell<TTable, unknown> | null>>;
}

interface DataManagerProviderProps<TTable, TView extends {}>
  extends DataManagerPassedDownProps<TTable, TView> {
  children: React.ReactNode;
}

export const DataManagerContext =
  createContext<DataManagerContextProps<T, unknown>>(null);

function DataManagerProvider<TTable, TView extends {}>({
  children,
  columns,
  currentView,
  updateView,
  tableInstance,
  onItemClick,
  pagination,
  contextMenu,
}: DataManagerProviderProps<TTable, TView>) {
  const [selectedCell, setSelectedCell] =
    useState<Cell<TTable, unknown>['id']>(null);
  const [editingCell, setEditingCell] = useState<Cell<TTable, unknown>>(null);

  const setColumnCount = useCallback(
    (columnCount: number) => {
      updateView('preferences', {
        ...currentView.preferences,
        columnCount,
      })
        .then(() => {
          setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
        })
        .catch(() => {});
    },
    [updateView, currentView],
  );

  const setAggregation = () => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const { rows } = tableInstance.getRowModel();
      const visibleColumns = tableInstance.getAllColumns();
      const index = selectedCell.split('_')[0];
      const columnName = selectedCell.split('_')[1];
      const columnIndex = visibleColumns.findIndex(
        (column) => column.id === columnName,
      );
      // const { cursor, result } = this.state
      // arrow up/down button should select next/previous list element
      if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
        const nextColumn = visibleColumns[columnIndex + 1];
        console.log('right');
        if (nextColumn) {
          setSelectedCell(`${index}_${nextColumn.id}`);
        }
      } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
        console.log('left');
        const previousColumn = visibleColumns[columnIndex - 1];
        if (previousColumn) {
          setSelectedCell(`${index}_${previousColumn.id}`);
        }
      } else if (e.key === 'ArrowUp') {
        if (Number(index) === 0) {
        } else {
          setSelectedCell(`${Number(index) - 1}_${columnName}`);
        }
      } else if (e.key === 'ArrowDown') {
        if (Number(index) === rows.length - 1) {
        } else {
          setSelectedCell(`${Number(index) + 1}_${columnName}`);
        }
      }
    };

    if (selectedCell) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, tableInstance]);

  const value = useMemo(
    () => ({
      tableInstance,
      currentView,
      updateView,
      columns,
      columnCount: currentView.preferences?.columnCount,
      setColumnCount,
      // setAggregation,
      onItemClick,
      pagination,
      contextMenu,
      // cell selection
      selectedCell,
      setSelectedCell,
      // cell editing
      editingCell,
      setEditingCell,
    }),
    [
      tableInstance,
      currentView,
      updateView,
      columns,
      setColumnCount,
      onItemClick,
      pagination,
      contextMenu,
      selectedCell,
      setSelectedCell,
      editingCell,
      setEditingCell,
    ],
  );

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  );
}

function useDataManagerContext() {
  const context = useContext(DataManagerContext);
  if (context === undefined) {
    throw new Error(
      'useDataManagerContext must be used within a DataManagerProvider',
    );
  }
  return context;
}

export { DataManagerProvider, useDataManagerContext };
