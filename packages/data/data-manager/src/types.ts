import { FieldGroup } from '@uidu/data-fields';
import { DataView } from '@uidu/data-views';

export type RowAction = {
  children: any;
  onClick: any;
};

export type DataManagerProps = {
  currentView?: DataView;
  updateView?: (dataView: DataView, props: keyof DataView) => Promise<any>;
  isAutoSaving: string;
  columnDefs: Array<FieldGroup>;
  rowData: Array<any>;
  onAddField?: () => void;
  onItemClick?: ({ data }: { data: any }) => void;
  children: ({ renderControls, renderView, renderSidebar }) => any;
  actions?: RowAction[];
};

export type DataManagerNextProps = {
  currentView?: DataView;
  updateView?: (dataView: DataView, props: keyof DataView) => Promise<any>;
  isAutoSaving: string;
  columnDefs: Array<FieldGroup>;
  resultSet: any;
  onAddField?: () => void;
  onItemClick?: ({ data }: { data: any }) => void;
  children: ({ renderControls, renderView, renderSidebar }) => any;
  actions?: RowAction[];
};
