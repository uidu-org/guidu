import * as events from 'events';
import { Subject } from 'rxjs/Subject';
import { Observable, EMPTY } from 'rxjs';
import {
  Context,
  ContextConfig,
  FileItem,
  Auth,
  FileState,
} from '@uidu/media-core';

export class Stubs {
  static mediaViewer(overrides: any) {
    const noop = () => {};
    const emitter = new events.EventEmitter();
    const mediaViewer = {
      on: noop,
      off: noop,
      trigger: (event: string) => emitter.emit(event),
      isOpen: jest.fn(),
      open: overrides.open || jest.fn(),
      setFiles: overrides.setFiles || jest.fn(),
      getCurrent: jest.fn(),
      isShowingLastFile: jest.fn(),
    };

    jest
      .spyOn(mediaViewer, 'on')
      .mockImplementation(() => {});
    jest
      .spyOn(mediaViewer, 'off')
      .mockImplementation(() => {});

    return mediaViewer;
  }

  static mediaViewerConstructor(overrides?: any) {
    return jest.fn(() => Stubs.mediaViewer(overrides || {}));
  }

  static mediaItemProvider(subject?: Subject<FileItem>) {
    return {
      observable: jest.fn(() => subject || new Subject<FileItem>()),
    };
  }

  static context(
    config: ContextConfig,
    getFileState?: () => Observable<FileState>,
  ): Partial<Context> {
    return {
      config,
      file: {
        downloadBinary: jest.fn(),
        getFileState: jest.fn(getFileState || (() => EMPTY)),
        upload: jest.fn(),
      } as any,
      collection: {
        getItems: jest.fn(() => EMPTY),
        loadNextPage: jest.fn(),
      } as any,
    };
  }
}

export interface CreateContextOptions {
  authPromise?: Promise<Auth>;
  getFileState?: () => Observable<FileState>;
  config?: ContextConfig;
}

export const createContext = (options?: CreateContextOptions) => {
  const defaultOptions: CreateContextOptions = {
    authPromise: Promise.resolve<Auth>({
      token: 'some-token',
      clientId: 'some-client-id',
      baseUrl: 'some-service-host',
    }),
    getFileState: undefined,
    config: undefined,
  };
  const { authPromise, getFileState, config } = options || defaultOptions;
  const authProvider = jest.fn(() => authPromise);
  const contextConfig: ContextConfig = {
    authProvider,
  };
  return Stubs.context(config || contextConfig, getFileState) as Context;
};
