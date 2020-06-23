import { RouteComponentProps } from 'react-router-dom';

export type Provider = {
  name: string;
  label: React.ReactNode | string;
  component: React.FC<any>;
  clientId?: string;
};

export type DeviseProps = {
  children: any;
  providers?: Array<Provider>;
  routes: {
    registrations: string;
    sessions: string;
    passwords: string;
  };
  defaultView?: 'sessions' | 'registrations' | 'passwords';

  // Actions
  checkExistence?: (model) => Promise<any>;

  authLogin?: (auth, provider) => Promise<any>;
  signIn: (model) => Promise<any>;
  signUp: (model) => Promise<any>;
  recoverPassword: (model) => Promise<any>;
  resetPassword: (model) => Promise<any>;

  additionalSignInInfo?: React.FC<any>;

  // Footer
} & RouteComponentProps;

export type ProvidersProps = {};

export type DeviseWrapperProps = {
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: any;
};
