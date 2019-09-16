import loadable from '@loadable/component';
import { ShellBody, ShellBodyWithSpinner } from '@uidu/shell';
import React, { Component } from 'react';
import CustomHeader from './headers';

const AgGridReact = (loadable as any).lib(() => import('ag-grid-react'));

export default class Table extends Component<any> {
  static defaultProps = {
    theme: 'balham',
  };

  render() {
    const { theme, innerRef } = this.props;
    return (
      <div className={`ag-theme-${theme} h-100`}>
        <AgGridReact
          fallback={
            <ShellBody>
              <ShellBodyWithSpinner />
            </ShellBody>
          }
        >
          {({ AgGridReact: Grid }) => (
            <Grid
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
          )}
        </AgGridReact>
      </div>
    );
  }
}
