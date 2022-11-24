import { FC } from 'react';
import {
  DraggableId,
  DraggableLocation,
  DraggableProvided,
} from 'react-beautiful-dnd';

export type Id = string;

export type ItemProps<T> = {
  id: Id;
  content: string | React.ReactNode;
  data?: T;
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

export type ColumnContainerProps = {};

export type ContainerProps = {};

export type ParentProps = {
  height: number;
};

export type ItemsListWrapperProps = {};

export type ItemsListScrollContainerProps = {};

export type InnerListContainerProps = {
  children: React.ReactNode;
};

export type InnerListDropzoneProps = {
  children: React.ReactNode;
};

export type ItemComponentProps<TItem> = {
  item: ItemProps<TItem>;
  provided: DraggableProvided;
  isDragging: boolean;
  isGroupedOver: boolean;
};

export type BoardComponents<
  TItem,
  TColumn extends { id: string; name: string },
> = {
  columnHeader?: FC<ColumnComponentProps<TItem, TColumn>>;
  columnContainer?: FC<ColumnComponentProps<TItem, TColumn>>;
  columnFooter?: FC<ColumnComponentProps<TItem, TColumn>>;
  container?: FC<ContainerProps>;
  parent?: FC<ParentProps>;
  itemsListWrapper?: FC<ItemsListWrapperProps<TItem, TColumn>>;
  itemsListScrollContainer?: FC<ItemsListScrollContainerProps<TItem, TColumn>>;
  innerListContainer?: FC<InnerListContainerProps>;
  innerListDropzone?: FC<InnerListDropzoneProps>;
  item?: FC<ItemComponentProps<TItem>>;
};

export type BoardProps<TItem, TColumn extends { id: string; name: string }> = {
  withScrollableColumns?: boolean;
  withDraggableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: number;
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
