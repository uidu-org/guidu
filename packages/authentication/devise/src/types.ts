import { RouteComponentProps } from 'react-router-dom';

export type DeviseProps = {
  providers?: Array<any>;
  routes: {
    registrations: string;
    sessions: string;
    passwords: string;
  };
  app: {
    icon: string;
    name: string;
  };
  defaultView?: 'sessions' | 'registrations' | 'passwords';

  checkExistence?: (model) => Promise<any>;

  authLogin?: (auth, provider) => Promise<any>;
  onAuthLogin?: (response) => void;
  onAuthLoginError?: (response) => void;

  signIn: (model) => Promise<any>;
  onSignIn: (response) => void;
  onSignInError?: (response) => void;

  signUp: (model) => Promise<any>;
  onSignUp: (response) => void;
  onSignUpError?: (response) => void;

  recoverPassword: (model) => Promise<any>;
  onRecoverPassword: (response) => void;
  onRecoverPasswordError?: (response) => void;

  resetPassword: (model) => Promise<any>;
  onResetPassword: (response) => void;
  onResetPasswordError?: (response) => void;
} & RouteComponentProps;
