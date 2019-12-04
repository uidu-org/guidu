import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default class TogglerForm extends PureComponent<any> {
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list-group"
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {cleanedColumnDefs.map((columnDef, index) => (
                <Draggable
                  key={columnDef.colId}
                  draggableId={columnDef.colId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={columnDef.colId}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={e => {
                        e.preventDefault();
                        onToggle(columnDef.colId, !!columnDef.hide);
                      }}
                      className="list-group-item px-3 px-xl-4"
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="text-truncate flex-grow-1">
                          {columnDef.headerComponentParams && (
                            <span
                              style={{ width: 22, display: 'inline-block' }}
                              className="mr-2"
                            >
                              {columnDef.headerComponentParams.menuIcon}
                            </span>
                          )}
                          {columnDef.headerName}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
