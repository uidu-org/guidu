import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import React, { useState } from 'react';
import CustomHeader from './headers';

const Table = ({
  theme = 'uidu',
  columnDefs,
  rowData,
  onAddField = () => {},
  rowHeight = 32,
  sorters = [], // sync sorters from parents for styling
  ...otherProps
}) => {
  const [scrolled, setScrolled] = useState({ left: 0, top: 0 });
  let className = '';
  if (scrolled.left > 0) {
    className += ' ag-scrolled-left';
  }
  if (scrolled.top > 0) {
    className += ' ag-scrolled-top';
  }

  const sortedById = sorters.map(s => s.colId);

  console.log(columnDefs);

  return (
    <div className={`ag-theme-${theme} h-100${className}`}>
      <AgGridReact
        modules={[ClientSideRowModelModule, RowGroupingModule]}
        // ref={innerRef}
        // enterprise features
        groupDefaultExpanded={-1}
        groupUseEntireRow
        // suppressAggFuncInHeader
        // community features
        componentWrappingElement="span"
        columnDefs={columnDefs}
        rowData={rowData}
        animateRows
        defaultColDef={{
          resizable: true,
          sortable: true,
          suppressMenu: true,
          editable: false,
          headerComponentFramework: CustomHeader,
          minWidth: 140,
          cellStyle: params => {
            return {
              lineHeight: `${rowHeight}px`,
            };
          },
          cellClassRules: {
            'ag-cell-sorter-active': params => {
              // const column = params.columnApi.getColumn(params.colDef.colId);
              // console.log('sorters in params', sorters);
              // console.log(column);
              // console.log(column ? column.getSort() : 'no column');
              return sortedById.includes(params.colDef.colId);
            },
          },
        }}
        columnTypes={{
          avatar: {},
          addField: {},
          address: {},
          attachments: {},
          checkbox: {},
          country: {},
          cover: {},
          currency: {},
          date: {},
          default: {},
          email: {},
          linkRecord: {},
          member: {},
          multipleSelect: {},
          number: {},
          percent: {},
          phone: {},
          primary: {},
          progress: {},
          rating: {},
          singleSelect: {},
          string: {},
          text: {},
          uid: {},
          url: {},
          vote: {},
        }}
        rowHeight={rowHeight}
        onBodyScroll={({ left, top }) => setScrolled({ left, top })}
        {...otherProps}
      />
    </div>
  );
};

export default Table;
