import { DraggableLocation } from 'react-beautiful-dnd';
import { ItemProps, ItemMapProps } from '../types';

export const grid: number = 8;
export const borderRadius: number = 2;

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

type ReorderItemMapArgs = {
  itemMap: ItemMapProps,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export type ReorderItemMapResult = {
  itemMap: ItemMapProps,
};

export const reorderItemMap = ({
  itemMap,
  source,
  destination,
}: ReorderItemMapArgs): ReorderItemMapResult => {
  const current: ItemProps[] = [...itemMap[source.droppableId]];
  const next: ItemProps[] = [...itemMap[destination.droppableId]];
  const target: ItemProps = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: ItemProps[] = reorder(
      current,
      source.index,
      destination.index,
    );
    const result: ItemMapProps = {
      ...itemMap,
      [source.droppableId]: reordered,
    };
    return {
      itemMap: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result: ItemMapProps = {
    ...itemMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    itemMap: result,
  };
};
