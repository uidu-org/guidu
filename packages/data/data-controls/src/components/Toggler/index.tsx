import { CheckboxStateless } from '@uidu/checkbox';
import React, { PureComponent } from 'react';
import { TogglerProps } from './types';

export default class TogglerForm extends PureComponent<TogglerProps> {
  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.props.onDragEnd({
      name: result.draggableId,
      oldIndex: result.source.index,
      newIndex: result.destination.index,
    });
  };

  render() {
    const { columnDefs, gridColumnApi } = this.props;
    const columnGroups = [...new Set(columnDefs.map(cd => cd.fieldGroup.kind))];
    console.log('columnGroups', columnGroups);
    return (
      <div className="list-group">
        {columnGroups.map(columnGroup => {
          const columns = columnDefs.filter(
            column =>
              column.fieldGroup.kind === columnGroup &&
              ['uid', 'cover', 'avatar', 'addField'].indexOf(column.viewType) <
                0,
          );
          if (columns.length === 0) {
            return null;
          }
          const columnGroupObj = columns[0].fieldGroup;
          const isGroupChecked =
            columns.filter(c => !c.hide).length === columns.length;
          const isIndeterminate =
            columns.filter(c => !c.hide).length > 0 && !isGroupChecked;
          return (
            <>
              <a
                key={columnGroup}
                href="#"
                className="list-group-item list-group-item-action px-3 px-xl-4 bg-light py-2"
                onClick={e => {
                  e.preventDefault();
                  gridColumnApi.setColumnsVisible(
                    columns.map(c => c.colId),
                    !isGroupChecked,
                  );
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span className="mr-2">
                    <CheckboxStateless
                      checked={isGroupChecked}
                      isIndeterminate={isIndeterminate}
                    />
                  </span>
                  <div className="text-truncate flex-grow-1 text-muted text-uppercase small">
                    {columnGroupObj.name}
                  </div>
                </div>
              </a>
              {columns.map((columnDef, index) => (
                <a
                  href="#"
                  key={columnDef.colId}
                  className="list-group-item list-group-item-action px-3 px-xl-4 py-2"
                  onClick={e => {
                    e.preventDefault();
                    gridColumnApi.setColumnVisible(
                      columnDef.colId,
                      !!columnDef.hide,
                    );
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="mr-2">
                      <CheckboxStateless checked={!columnDef.hide} />
                    </span>
                    <div className="text-truncate flex-grow-1">
                      {columnDef.headerComponentParams && (
                        <span
                          style={{
                            width: 22,
                            display: 'inline-block',
                            textAlign: 'center',
                            opacity: 0.5,
                          }}
                          className="mr-2"
                        >
                          {columnDef.headerComponentParams.menuIcon}
                        </span>
                      )}
                      {columnDef.headerName}
                    </div>
                  </div>
                </a>
              ))}
            </>
          );
        })}
      </div>
    );
  }
}
