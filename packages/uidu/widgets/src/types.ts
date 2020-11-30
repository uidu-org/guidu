import { FC, ReactNode } from 'react';
import { SideNavigationSchema } from '../../../navigation/side-navigation/src/components/SideNavigation/types';

export type ShellStep = {
  component: FC<any>;
  relativePath: string;
  name: ReactNode;
  isDisabled?: boolean;
  isCompleted?: boolean;
  nextStepRelativePath?: string;
  unwrapped?: boolean;
};

export type ShellProps = {
  name: string | ReactNode;
  baseUrl: string;
  steps: Array<ShellStep>;
  scope: string;
  embedded?: boolean;
  whiteLabel?: boolean;
  sidebarFooterAdditionalItems?: Partial<SideNavigationSchema[]>;
};
