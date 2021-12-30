import { useDataManagerContext } from '@uidu/data-manager';
import React from 'react';
import ColumnGroup from './ColumnGroup';
import { TogglerProps } from './types';

export default function TogglerForm(props: TogglerProps) {
  const { tableInstance, columns } = useDataManagerContext();
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    props.onDragEnd({
      name: result.draggableId,
      oldIndex: result.source.index,
      newIndex: result.destination.index,
    });
  };

  const columnGroups = [...new Set(columns.map((cd) => cd.fieldGroup.kind))];

  return (
    <>
      {columnGroups.map((columnGroup) => {
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
            checkedColumnsCount={checkedColumnsCount}
            columnGroupObj={columnGroupObj}
            isGroupChecked={isGroupChecked}
            columns={columns}
          />
        );
      })}
    </>
  );
}
