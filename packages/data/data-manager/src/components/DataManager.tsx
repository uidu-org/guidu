/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DataManagerProps } from '../types';
import { DataManagerProvider } from './DataManagerContext';

const defaultOnViewUpdate = () => {};

export default function DataManager<T>({
  children,
  onItemClick,
  onViewUpdate = defaultOnViewUpdate,
  currentView,
  updateView,
  actions = () => [],
  contextMenu,
  pagination,
  tableInstance,
}: DataManagerProps<T>) {
  // const defaultColumns = useMemo(
  //   () => [
  //     ...columns,
  //     ...(actions.length > 0
  //       ? [
  //           {
  //             id: 'actions',
  //             header: (props) => null,
  //             footer: (props) => null,
  //             cell: RowActionsCell,
  //             // suppressMenu: true,
  //             enableHiding: false,
  //             enableResizing: false,
  //             minSize: 56,
  //             size: 56,
  //             maxSize: 56,
  //             meta: {
  //               pinned: 'right',
  //               cellProps: {
  //                 style: { padding: 0 },
  //               },
  //             },
  //           } as Partial<ColumnDef<T>>,
  //         ]
  //       : []),
  //   ],
  //   [columns, actions, RowActionsCell],
  // );

  // const table = useReactTable<T>({
  //   data: rowData,
  //   columns: defaultColumns,
  //   ...options,
  // });

  // useImperativeHandle(forwardedRef, () => table, [table]);

  // const onViewUpdateDebounce = useAsyncDebounce(onViewUpdate, 100);
  // const onItemSelectDebounce = useAsyncDebounce(onItemSelect, 100);

  // useEffect(() => {
  //   onViewUpdateDebounce(state);
  // }, [state, onViewUpdateDebounce]);

  // useEffect(() => {
  //   onItemSelectDebounce(selectedFlatRows);
  // }, [selectedFlatRows, onItemSelectDebounce]);

  return (
    <DataManagerProvider
      currentView={currentView}
      columns={tableInstance.getAllColumns()}
      tableInstance={tableInstance}
      onItemClick={onItemClick}
      onViewUpdate={onViewUpdate}
      updateView={updateView}
      actions={actions}
      contextMenu={contextMenu}
      pagination={pagination}
    >
      {children}
    </DataManagerProvider>
  );
}
