import { NavigationItemBaseProps } from '../../../types';
import { NavigationSubItemProps } from '../NavigationSubItem/types';

export type NavigationItemProps = NavigationItemBaseProps & {
  items?: Array<NavigationSubItemProps>;
  actions?: Array<any>;
  isSortable?: boolean;
  onDragEnd?: (result: any) => void;
};
