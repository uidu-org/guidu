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
    gridColumnApi.applyColumnState(state);
    // column visibility and order stays into column state
  }

  gridColumnApi.setColumnsVisible(
    gridColumnApi.getAllColumns().map((c: any) => c.colId),
    false,
  );
  gridColumnApi.setColumnsVisible(fields as any, true);

  // handle sorters
  // console.log(sorters);
  // gridColumnApi.applyColumnState({
  //   state: [
  //     { colId: 'country', sort: 'asc', sortIndex: 0 },
  //     { colId: 'sport', sort: 'asc', sortIndex: 1 },
  //   ],
  //   defaultState: { sort: null },
  // });
  // gridApi.setSortModel(sorters);
  // handle filters
  gridApi.setFilterModel(filterModel);
  // handle groupers
  if (groupers.length > 0) {
    gridColumnApi.setRowGroupColumns(groupers.map((g) => g.colId));
  } else {
    gridColumnApi.setRowGroupColumns([]);
  }
  return true;
};
