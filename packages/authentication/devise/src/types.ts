import { RouteComponentProps } from 'react-router-dom';

export type DeviseProps = {
  children: any;
  providers?: Array<any>;
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

  // Footer
} & RouteComponentProps;

export type ProvidersProps = {};

export type DeviseWrapperProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};
