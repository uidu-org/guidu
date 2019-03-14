export type GetNowTimeFn = () => number;

export interface AuthService {
  id: string;
  name: string;
  startAuthUrl: string;
}

export type PendingState = {
  status: 'pending';
};

export type ResolvingState = {
  status: 'resolving';
};

export type ErroredState = {
  definitionId: undefined;
  status: 'errored';
};

export type NotFoundState = {
  status: 'not-found';
};

export type DefinedStatus = 'resolved' | 'unauthorized' | 'forbidden';

export type DefinedState = {
  status: DefinedStatus;
  definitionId: string;
  services: AuthService[];
  data?: { [name: string]: any };
};

export type ObjectState =
  | PendingState
  | ResolvingState
  | ErroredState
  | NotFoundState
  | DefinedState;

export type ObjectStatus = Pick<ObjectState, 'status'>['status'];

export type CardUpdateCallback<T> = (state: [T | null, boolean]) => void;
