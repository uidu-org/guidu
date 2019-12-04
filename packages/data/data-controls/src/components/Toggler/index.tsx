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
    const { onToggle, columnDefs } = this.props;

    const cleanedColumnDefs = columnDefs.filter(
      columnDef => !columnDef.lockVisible,
    );

    return (
      <div
        className="list-group"
        // style={getListStyle(snapshot.isDraggingOver)}
      >
        <a
          href="# "
          className="list-group-item list-group-item-action px-3 px-xl-4 bg-light py-2"
        >
          <div className="d-flex align-items-center justify-content-between">
            <span className="mr-2">
              <CheckboxStateless checked={false} />
            </span>
            <div className="text-truncate flex-grow-1 text-muted text-uppercase small">
              Default fields
            </div>
          </div>
        </a>
        {cleanedColumnDefs.map((columnDef, index) => (
          <a
            href="#"
            key={columnDef.colId}
            className="list-group-item list-group-item-action px-3 px-xl-4 py-2"
            onClick={e => {
              e.preventDefault();
              onToggle(columnDef.colId, !!columnDef.hide);
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
      </div>
    );
  }
}
