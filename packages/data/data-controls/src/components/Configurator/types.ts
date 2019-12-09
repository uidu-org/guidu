import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { Column } from '@uidu/table';
import { GrouperProps } from '../Grouper/types';
import { ResizerProps } from '../Resizer/types';
import { TogglerProps } from '../Toggler/types';

export type ConfiguratorProps = GrouperProps &
  TogglerProps &
  ResizerProps & {
    columnDefs: Column[];
    currentView: any;
    onSetColumnCount: (columnCount: number) => void;
    columnCount?: number;
    gridApi: GridApi;
    gridColumnApi: ColumnApi;
  };
