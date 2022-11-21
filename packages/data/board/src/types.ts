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

export type BoardComponents<T> = {
  columnHeader?: FC<{ isDragging: boolean; items: T[]; title: string }>;
  columnContainer?: FC<any>;
  columnFooter?: FC<{ isDragging: boolean; items: T[]; title: string }>;
  container?: FC<any>;
  parent?: FC<any>;
  itemsListWrapper?: FC<any>;
  itemsListScrollContainer?: FC<any>;
  innerListContainer?: FC<any>;
  innerListDropzone?: FC<any>;
  item?: FC<any>;
  columnDefs?: FC<any>;
};

export type BoardProps<T> = {
  withScrollableColumns?: boolean;
  withDraggableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  components?: BoardComponents<T>;
  onDragEnd?: (result: any) => void;
  columns: Array<{
    id: string;
    name: string;
  }>;
  itemsMap: Record<string, T[]>;
};

export type ColumnProps<T> = {
  title: string;
  items: T[];
  index: number;
  isScrollable?: boolean;
  isDragDisabled?: boolean;
  isCombineEnabled?: boolean;
  components?: BoardComponents<T>;
  columnDefs?: any;
};

export type ItemsListProps<T> = {
  listId?: string;
  listType?: string;
  items: T[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;
  components?: BoardComponents<T>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  columnDefs?: any;
};
