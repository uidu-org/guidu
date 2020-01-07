import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { DataView } from '@uidu/data-views';

export const initializeDataView = async ({
  currentView: {
    fields = [],
    sorters = [],
    filterModel,
    groupers = [],
    state = null,
    preferences = {},
  },
  gridApi,
  gridColumnApi,
}: {
  currentView: DataView;
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
}) => {
  gridApi.showLoadingOverlay();

  // handle fields

  // handle state
  if (state) {
    gridColumnApi.setColumnState(state);
    // column visibility and order stays into column state
  }

  gridColumnApi.setColumnsVisible(
    gridColumnApi.getAllColumns().map((c: any) => c.colId),
    false,
  );
  gridColumnApi.setColumnsVisible(fields as any, true);

  // handle sorters
  gridApi.setSortModel(sorters);
  // handle filters
  gridApi.setFilterModel(filterModel);
  // handle groupers
  if (groupers.length > 0) {
    gridColumnApi.setRowGroupColumns(groupers.map(g => g.colId));
  } else {
    gridColumnApi.setRowGroupColumns([]);
  }
  return true;
};
