import { FC } from 'react';
import { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Id = string;

export type ItemProps = {
  id: Id;
  content: string | React.ReactNode;
  data?: any;
};

export type Dragging = {
  id: DraggableId;
  location: DraggableLocation;
};

export type ItemMapProps<T> = {
  [key: string]: T[];
};

export type ColumnComponentProps<TItem, TColumn> = {
  isDragging: boolean;
  items: TItem[];
  column: TColumn;
};

export type BoardComponents<
  TItem,
  TColumn extends { id: string; name: string },
> = {
  columnHeader?: FC<ColumnComponentProps<TItem, TColumn>>;
  columnContainer?: FC<any>;
  columnFooter?: FC<ColumnComponentProps<TItem, TColumn>>;
  container?: FC<any>;
  parent?: FC<any>;
  itemsListWrapper?: FC<any>;
  itemsListScrollContainer?: FC<any>;
  innerListContainer?: FC<any>;
  innerListDropzone?: FC<any>;
  item?: FC<any>;
};

export type BoardProps<TItem, TColumn extends { id: string; name: string }> = {
  withScrollableColumns?: boolean;
  withDraggableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  components?: BoardComponents<TItem, TColumn>;
  onDragEnd?: (result: any) => void;
  columns: TColumn[];
  itemsMap: ItemMapProps<TItem>;
};

export type ColumnProps<TItem, TColumn extends { id: string; name: string }> = {
  name: TColumn['name'];
  column: TColumn;
  items: TItem[];
  index: number;
  isScrollable?: boolean;
  isDragDisabled?: boolean;
  isCombineEnabled?: boolean;
  components?: BoardComponents<TItem, TColumn>;
};

export type ItemsListProps<
  TItem,
  TColumn extends { id: string; name: string },
> = {
  listId?: string;
  listType?: string;
  items: TItem[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;
  components?: BoardComponents<TItem, TColumn>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};
