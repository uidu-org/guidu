import React, { PureComponent } from 'react';
import ColumnGroup from './ColumnGroup';
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

    return columnGroups.map(columnGroup => {
      const columns = columnDefs.filter(
        column =>
          column.fieldGroup.kind === columnGroup &&
          ['uid', 'cover', 'avatar', 'addField'].indexOf(column.viewType) < 0 &&
          !column.lockVisible,
      );
      if (columns.length === 0) {
        return null;
      }
      const columnGroupObj = columns[0].fieldGroup;
      const isGroupChecked =
        columns.filter(c => !c.hide).length === columns.length;
      const checkedColumnsCount = columns.filter(c => !c.hide).length;
      return (
        <ColumnGroup
          gridColumnApi={gridColumnApi}
          key={columnGroup}
          checkedColumnsCount={checkedColumnsCount}
          columnGroupObj={columnGroupObj}
          isGroupChecked={isGroupChecked}
          columns={columns}
        />
      );
    });
  }
}
