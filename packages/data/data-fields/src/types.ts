export type Field = {
  kind: string;
  name: string | React.ReactNode;
  icon: React.ReactNode;
  description?: React.ReactNode;
  form?: React.FC<any>;
};
