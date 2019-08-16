export type FieldBaseLayout = 'horizontal' | 'vertical' | 'elementOnly';

export type FieldBaseProps = {
  errorMessages?: Array<string>;
  help?: React.ReactNode | string;
  label?: React.ReactNode | string;
  layout?: FieldBaseLayout;
  showErrors?: boolean;
  value: any;
  name: string;
  /** Function that is called whenever the state of the checkbox changes. It will
   be called with an object containing the react synthetic event. Use currentTarget to get value, name and checked */
  onChange: (name, value) => void;
  onSetValue: (value) => void;
};
