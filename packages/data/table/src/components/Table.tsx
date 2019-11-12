if (process.env.NODE_ENV === 'development') {
  console.log('importing grid-enterprise');
  import('ag-grid-enterprise');
}
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import CustomHeader from './headers';

const Table = ({
  theme = 'uidu',
  columnDefs,
  rowData,
  onAddField = () => {},
  rowHeight = 32,
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

  return (
    <div className={`ag-theme-${theme} h-100${className}`}>
      <AgGridReact
        // ref={innerRef}
        // enterprise features
        groupDefaultExpanded={-1}
        groupUseEntireRow
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
          cellStyle: { lineHeight: `${rowHeight}px` },
        }}
        // columnTypes={{
        //   avatar: {},
        //   addField: {},
        //   address: {},
        //   attachments: {},
        //   checkbox: {},
        //   country: {},
        //   cover: {},
        //   currency: {},
        //   date: {},
        //   default: {},
        //   email: {},
        //   linkRecord: {},
        //   member: {},
        //   multipleSelect: {},
        //   number: {},
        //   percent: {},
        //   phone: {},
        //   primary: {},
        //   progress: {},
        //   rating: {},
        //   singleSelect: {},
        //   string: {},
        //   text: {},
        //   uid: {},
        //   url: {},
        //   vote: {},
        // }}
        rowHeight={rowHeight}
        onBodyScroll={({ left, top }) => setScrolled({ left, top })}
        {...otherProps}
      />
    </div>
  );
};

export default Table;
