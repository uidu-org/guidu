import { AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import CustomHeader from './headers';

export default class Table extends Component<any> {
  static defaultProps = {
    theme: 'balham',
  };

  render() {
    const { theme, innerRef } = this.props;
    return (
      <div className={`ag-theme-${theme} h-100`}>
        <AgGridReact
          ref={innerRef}
          componentWrappingElement="div"
          columnDefs={this.props.columnDefs}
          rowData={this.props.rowData}
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
          {...this.props}
        />
      </div>
    );
  }
}
