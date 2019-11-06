import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import CustomHeader from './headers';

const Table = ({ theme = 'balham', columnDefs, rowData, ...otherProps }) => {
  const [scrolled, setScrolled] = useState({ left: 0, top: 0 });
  let className = '';
  if (scrolled.left > 0) {
    className += ' ag-scrolled-left';
  }
  if (scrolled.top > 0) {
    className += ' ag-scrolled-top';
  }

  return (
    <div className={`ag-theme-${theme} h-100${className}`}>
      <AgGridReact
        // ref={innerRef}
        componentWrappingElement="div"
        columnDefs={columnDefs}
        rowData={rowData}
        reactNext
        animateRows
        defaultColDef={{
          resizable: true,
          sortable: true,
          suppressMenu: false,
          editable: true,
          headerComponentFramework: CustomHeader,
          minWidth: 140,
        }}
        columnTypes={{
          avatar: {},
          address: {},
          attachments: {},
          checkbox: {},
          country: {},
          cover: {},
          currency: {},
          date: {},
          default: {},
          email: {},
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
        rowHeight={32}
        onBodyScroll={({ left, top }) => setScrolled({ left, top })}
        {...otherProps}
      />
    </div>
  );
};

export default Table;
