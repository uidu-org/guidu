export type FormHandleSubmit = (model, resetForm) => Promise<any>;

export type FormProps = {
  children: React.ReactNode;
  handleSubmit: FormHandleSubmit;
  footerRenderer: (
    { loading, canSubmit },
    form,
    handleSubmit: (model, resetForm) => void,
  ) => void;
  withLoader?: boolean;
  submitted?: boolean;
  inputsWrapperProps?: any;
  autoComplete?: string;
  className?: string;
};

export type FormState = {
  canSubmit: boolean;
  isLoading: boolean;
};
