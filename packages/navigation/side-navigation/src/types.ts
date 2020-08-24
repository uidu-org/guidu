export type NavigationItemBaseProps = {
  type: string;
  text?: React.ReactNode | string;
  // heading?: string;
  path?: string;
  // items?: Array<NavigationItem>;
  component?: React.ReactNode | React.FC<any>;
  before?: React.ReactNode | React.FC<any>;
  after?: React.ReactNode | React.FC<any>;
};
