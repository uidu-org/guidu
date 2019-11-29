export type DataView = {
  id: string | number;
  kind: string;
  name: string | React.ReactNode;
  fields: String[];
  primaryField?: any;
};
