import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  ChevronRight,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  CornerLeftDown,
  EyeOff,
  Maximize2,
  Minimize2,
  Server,
} from 'react-feather';

const aggFuncs = [
  {
    id: 'avg',
    name: 'Average',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
  {
    id: 'count',
    name: 'Count',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
  {
    id: 'first',
    name: 'First',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
  {
    id: 'last',
    name: 'Last',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
  {
    id: 'max',
    name: 'Max',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
  {
    id: 'min',
    name: 'Min',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
  {
    id: 'sum',
    name: 'Sum',
    icon: renderToStaticMarkup(<Maximize2 size={16} />),
  },
];

export const getMainMenuItems = params => {
  const { api, columnApi, column } = params;
  const { colId } = column;
  console.log(params);
  return [
    ...(params.defaultItems.includes('valueAggSubMenu')
      ? [
          {
            name: 'Aggregation function',
            icon: renderToStaticMarkup(<CornerLeftDown size={16} />),
            subMenu: aggFuncs.map(aggFunc => ({
              name: aggFunc.name,
              action: () => columnApi.setColumnAggFunc(colId, aggFunc.id),
              icon: aggFunc.icon,
            })),
          },
        ]
      : []),
    ...(params.defaultItems.includes('expandAll')
      ? [
          {
            name: 'Expand all groups',
            action: () => api.expandAll(),
            icon: renderToStaticMarkup(<Maximize2 size={16} />),
          },
          {
            name: 'Collapse all groups',
            action: () => api.collapseAll(),
            icon: renderToStaticMarkup(<Minimize2 size={16} />),
          },
        ]
      : []),
    {
      name: 'Autosize this column',
      action: () => columnApi.autoSizeColumn(colId),
      icon: renderToStaticMarkup(<ChevronRight size={16} />),
    },
    {
      name: 'Autosize all columns',
      action: () => {
        const allColumnIds = [];
        columnApi.getAllColumns().forEach(column => {
          allColumnIds.push(column.colId);
        });
        columnApi.autoSizeColumns(allColumnIds);
      },
      icon: renderToStaticMarkup(<ChevronsRight size={16} />),
    },
    {
      name: 'Sort First-Last',
      action: () => {
        api.setSortModel([...api.getSortModel(), { colId, sort: 'asc' }]);
      },
      icon: renderToStaticMarkup(<ChevronsDown size={16} />),
    },
    {
      name: 'Sort Last-First',
      action: () => {
        api.setSortModel([...api.getSortModel(), { colId, sort: 'desc' }]);
      },
      icon: renderToStaticMarkup(<ChevronsUp size={16} />),
    },
    // {
    //   name: 'Add filter',
    //   action: function() {
    //     console.log('ag-Grid is great was selected');
    //   },
    //   icon: renderToStaticMarkup(<Filter size={14} />),
    // },
    ...(params.defaultItems.includes('rowGroup')
      ? [
          {
            name: 'Group by this field',
            action: () => {
              // columnApi.setColumnVisible(colId, false);
              api.showLoadingOverlay();
              columnApi.setRowGroupColumns([
                ...columnApi.getRowGroupColumns().map(g => g.colId),
                colId,
              ]);
              setTimeout(() => {
                api.refreshCells({ force: true });
                api.hideOverlay();
              }, 600);
            },
            icon: renderToStaticMarkup(<Server size={16} />),
          },
        ]
      : []),
    {
      name: 'Hide this field',
      action: () => columnApi.setColumnVisible(colId, false),
      icon: renderToStaticMarkup(<EyeOff size={16} />),
    },
  ];
};
