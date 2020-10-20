import React, { PureComponent } from 'react';
import ColumnGroup from './ColumnGroup';
import { TogglerProps } from './types';

export default class TogglerForm extends PureComponent<TogglerProps> {
  onDragEnd = (result) => {
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
    const { columnDefs, tableInstance } = this.props;
    const columnGroups = [
      ...new Set(columnDefs.map((cd) => cd.fieldGroup.kind)),
    ];

    return columnGroups.map((columnGroup) => {
      const columns = tableInstance.columns.filter(
        (column) =>
          column.fieldGroup.kind === columnGroup &&
          ['uid', 'cover', 'avatar', 'addField'].indexOf(column.kind) < 0 &&
          column.canHide,
      );
      if (columns.length === 0) {
        return null;
      }
      const columnGroupObj = columns[0].fieldGroup;
      const isGroupChecked =
        columns.filter((c) => c.isVisible).length === columns.length;
      const checkedColumnsCount = columns.filter((c) => c.isVisible).length;

      return (
        <ColumnGroup
          key={columnGroup}
          tableInstance={tableInstance}
          checkedColumnsCount={checkedColumnsCount}
          columnGroupObj={columnGroupObj}
          isGroupChecked={isGroupChecked}
          columns={columns}
        />
      );
    });
  }
}
