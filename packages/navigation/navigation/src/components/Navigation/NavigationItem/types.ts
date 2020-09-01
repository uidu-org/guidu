import { NavigationItemBaseProps } from '../../../types';

export type NavigationItemProps = NavigationItemBaseProps & {
  items?: Array<any>;
  actions?: Array<any>;
  isSortable?: boolean;
  onDragEnd?: (result: any) => void;
};
