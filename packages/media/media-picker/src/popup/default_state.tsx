import { State } from './domain';

// Hardcoded list of keys we want to fill in default state. These are the fields that are not filled,
// and needs to be provided when final state is constructed:
// 'context' | 'userContext' | 'redirectUrl' | 'config'
export type DefaultStateKeys =
  | 'uploads'
  | 'remoteUploads'
  | 'recents'
  | 'view'
  | 'accounts'
  | 'selectedItems'
  | 'isUploading'
  | 'isCancelling'
  | 'lastUploadIndex'
  | 'giphy'
  | 'onCancelUpload'
  | 'deferredIdUpfronts';

// TODO when AK moves to Typescript 3 please replace above hardcoded list with this:
// export type DefaultStateKeys = Exclude<
//   keyof State,
//   'context' | 'userContext' | 'redirectUrl' | 'config'
// >;

export type DefaultState = Pick<State, DefaultStateKeys>;
const defaultState: DefaultState = {
  uploads: {},
  remoteUploads: {},
  recents: {
    items: [],
  },
  view: {
    isVisible: false,
    service: {
      name: 'upload',
      accountId: '',
    },
    hasError: false,
    isLoading: true,
    path: [],
    items: [],
    isUploading: false,
    isCancelling: false,
  },
  accounts: Promise.resolve([]),
  selectedItems: [],
  isUploading: false,
  isCancelling: false,
  lastUploadIndex: 0,
  giphy: {
    imageCardModels: [],
    totalResultCount: undefined,
  },
  onCancelUpload: () => {
    throw new Error('onCancelUpload has not been set yet.');
  },
  deferredIdUpfronts: {},
};

export default defaultState;
