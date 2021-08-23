export type LabelProps = {
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  label: React.ReactNode;
  htmlFor: string;
  fakeLabel: boolean;
  required: boolean;
};
