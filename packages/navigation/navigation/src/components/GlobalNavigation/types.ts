export type GlobalNavigationProps = {
  body?: Array<any>;
  backgroundColor: string;
  footer?: Array<any>;
  header?: any;
  isOpen?: boolean;
  width: string;
  navigationWidth: number;
  navigationMinWidth?: string;
};

export type GlobalNavigationState = {
  isOpen: boolean;
}
