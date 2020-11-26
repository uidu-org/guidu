import { ReactNode } from 'react';

export type SideNavigationGroupItems = {
  type: 'NavigationItem' | 'NavigationItemSkeleton' | 'InlineComponent';
};

export type SideNavigationGroup = {
  type: 'NavigationGroup';
  heading?: string | ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  items: SideNavigationGroupItems[];
};

export type SideNavigationItems = {
  type: 'NavigationGroup';
  heading?: string | ReactNode;
  items?: SideNavigationGroupItems[];
};

export type SideNavigationSchema = {
  type:
    | 'NavigationHeader'
    | 'NavigationHeaderSkeleton'
    | 'NavigationSection'
    | 'NavigationFooter';
  text?: string | ReactNode;
  description?: string | ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  items?: SideNavigationGroup[] | SideNavigationItems[];
};

export type NavigationProps = {
  schema?: SideNavigationSchema[];
  position: 'absolute' | 'relative';
};
