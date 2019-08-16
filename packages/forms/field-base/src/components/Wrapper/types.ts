export type WrapperProps = {
  errorMessages: Array<any>;
  floatLabel: boolean;
  help: string | React.ReactNode;
  id: string;
  layout: string;
  type: string;
  showErrors: boolean;
  required: boolean;
  onChange: (name, value) => void;
};
