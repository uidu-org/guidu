export type GalleryProps = {
  columnCount: number;
  rowData: Array<any>;
  columnDefs: Array<any>;
  gutterSize: number;
  onItemClick?: (item) => void;
  sorters?: Array<any>;
  groupers?: Array<any>;
  filterModel?: any;
};
