export type LabelProps = {
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  label: React.ReactNode;
  htmlFor: string;
  labelClassName: string;
  fakeLabel: boolean;
  required: boolean;
};
