export type TreenavItem = {
  to: string;
  anchor?: string;
  name: string;
  component: any;
  items?: Array<TreenavItem>;
};

export type TreenavProps = {
  items: Array<TreenavItem>;
  breakpoint: number;
};
