export type RowProps = {
  children: React.ReactNode;
  fakeLabel: boolean;
  htmlFor: string;
  label: React.ReactNode;
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  required: boolean;
  showErrors: boolean;
};
