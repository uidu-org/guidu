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

export type ItemMapProps = {
  [key: string]: ItemProps[];
};

export type Task = {
  id: Id;
  content: string | React.ReactNode;
  data?: any;
};

export type BoardComponents = {
  columnHeader?: any;
  columnContainer?: any;
  columnFooter?: any;
  container?: any;
  parent?: any;
  itemsListWrapper?: any;
  itemsListScrollContainer?: any;
  innerListContainer?: any;
  innerListDropzone?: any;
  item?: any;
};

export type BoardProps = {
  initial: ItemMapProps;
  withScrollableColumns?: boolean;
  withDraggableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  components?: BoardComponents;
};

export type BoardState = {
  columns: ItemMapProps;
  ordered: string[];
};

export type ColumnProps = {
  title: string;
  items: ItemProps[];
  index: number;
  isScrollable?: boolean;
  isDragDisabled?: boolean;
  isCombineEnabled?: boolean;
  components?: BoardComponents;
};

export type ItemsListProps = {
  listId?: string;
  listType?: string;
  items: ItemProps[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;
  components?: BoardComponents;
};

type ItemListProps = {
  items: ItemProps[];
};
