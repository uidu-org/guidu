export const initializeDataView = ({
  currentView: {
    fields = [],
    sorters = [],
    filterModel = {},
    groupers = [],
    state = null,
    preferences = {},
  },
  gridApi,
  gridColumnApi,
}) => {
  gridApi.showLoadingOverlay();

  // handle fields
  gridColumnApi.setColumnsVisible(
    gridColumnApi.getAllColumns().map(c => c.colId),
    false,
  );
  gridColumnApi.setColumnsVisible(fields, true);

  // handle state
  if (state) {
    gridColumnApi.setColumnState(state);
    // column visibility and order stays into column state
  }

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

  // return {
  //   loaded: true,
  //   data: gridApi.getModel().rowsToDisplay,
  //   sorters: gridApi.getSortModel(),
  //   groupers: gridColumnApi.getRowGroupColumns(),
  //   columns: gridColumnApi
  //     .getAllGridColumns()
  //     .map(c => ({ ...c.colDef, hide: !c.visible })),
  //   // .sort((a, b) => fields.indexOf(a.colId) - fields.indexOf(b.colId)),
  // };
};
