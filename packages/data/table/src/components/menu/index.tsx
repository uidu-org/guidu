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
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
  {
    id: 'count',
    name: 'Count',
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
  {
    id: 'first',
    name: 'First',
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
  {
    id: 'last',
    name: 'Last',
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
  {
    id: 'max',
    name: 'Max',
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
  {
    id: 'min',
    name: 'Min',
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
  {
    id: 'sum',
    name: 'Sum',
    icon: renderToStaticMarkup(<Maximize2 size={14} />),
  },
];

export const getMainMenuItems = (params) => {
  const { api, columnApi, column } = params;
  const { id } = column;
  return [
    ...(params.defaultItems.includes('valueAggSubMenu')
      ? [
          {
            name: 'Aggregation function',
            icon: renderToStaticMarkup(<CornerLeftDown size={14} />),
            subMenu: aggFuncs.map((aggFunc) => ({
              name: aggFunc.name,
              action: () => {
                columnApi.setColumnAggFunc(column, aggFunc.id);
                // call this to save aggfunc in state
                api.onFilterChanged();
              },
              // icon: aggFunc.icon,
            })),
          },
        ]
      : []),
    ...(params.defaultItems.includes('expandAll')
      ? [
          {
            name: 'Expand all groups',
            action: () => api.expandAll(),
            icon: renderToStaticMarkup(<Maximize2 size={14} />),
          },
          {
            name: 'Collapse all groups',
            action: () => api.collapseAll(),
            icon: renderToStaticMarkup(<Minimize2 size={14} />),
          },
        ]
      : []),
    {
      name: 'Autosize this column',
      action: () => columnApi.autoSizeColumn(id),
      icon: renderToStaticMarkup(<ChevronRight size={14} />),
    },
    {
      name: 'Autosize all columns',
      action: () => {
        const allColumnIds = [];
        columnApi.getAllColumns().forEach((column) => {
          allColumnIds.push(column.id);
        });
        columnApi.autoSizeColumns(allColumnIds);
      },
      icon: renderToStaticMarkup(<ChevronsRight size={14} />),
    },
    {
      name: 'Sort First-Last',
      action: () => {
        columnApi.applyColumnState({ state: [{ id, sort: 'asc' }] });
      },
      icon: renderToStaticMarkup(<ChevronsDown size={14} />),
    },
    {
      name: 'Sort Last-First',
      action: () => {
        columnApi.applyColumnState({ state: [{ id, sort: 'desc' }] });
      },
      icon: renderToStaticMarkup(<ChevronsUp size={14} />),
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
              // columnApi.setColumnVisible(id, false);
              api.showLoadingOverlay();
              columnApi.setRowGroupColumns([
                ...columnApi.getRowGroupColumns().map((g) => g.id),
                id,
              ]);
              setTimeout(() => {
                api.refreshCells({ force: true });
                api.hideOverlay();
              }, 600);
            },
            icon: renderToStaticMarkup(<Server size={14} />),
          },
        ]
      : []),
    {
      name: 'Hide this field',
      action: () => columnApi.setColumnVisible(id, false),
      icon: renderToStaticMarkup(<EyeOff size={14} />),
    },
  ];
};
