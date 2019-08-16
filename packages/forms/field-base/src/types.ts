export type FieldBaseProps = {
  errorMessages: Array<string>;
  help: React.ReactNode | string;
  label: React.ReactNode | string;
  layout: 'horizontal' | 'vertical' | 'elementOnly';
  showErrors: boolean;
  onChange: (name, value) => void;
  onSetValue: () => void;
};
