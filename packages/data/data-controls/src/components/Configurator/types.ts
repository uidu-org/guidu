import { Column } from '@uidu/table';
import { GrouperProps } from '../Grouper/types';

export type ConfiguratorProps = GrouperProps & {
  columnDefs: Column[];
  currentView: any;
};
