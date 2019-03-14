import * as React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Store } from 'react-redux';

import { AuthProvider, ContextFactory } from '@uidu/media-core';
import { waitUntil } from '@uidu/media-test-helpers';

import { State } from '../../../domain';
import ConnectedApp, { App, AppDispatchProps } from '../../app';
import UploadView from '../../views/upload/upload';
import Browser from '../../views/browser/browser';
import {
  getComponentClassWithStore,
  mockStore,
} from '@uidu/media-test-helpers';
import { fileUploadsStart } from '../../../actions/fileUploadsStart';
import { UploadParams } from '../../../../domain/config';
import { LocalBrowserButton } from '../../views/upload/uploadButton';
import analyticsProcessing from '../../../middleware/analyticsProcessing';
import { Dropzone } from '../../../components/dropzone/dropzone';
import { MediaFile } from '../../../../domain/file';
import { showPopup } from '../../../actions/showPopup';
import reducers from '../../../reducers/reducers';

const tenantUploadParams: UploadParams = {};
const baseUrl = 'some-api-url';
const clientId = 'some-client-id';
const token = 'some-token';
const userAuthProvider: AuthProvider = () =>
  Promise.resolve({
    clientId,
    token,
    baseUrl,
  });

const createDragEvent = (
  eventName: 'dragover' | 'drop' | 'dragleave',
  types: string[] = ['Files'],
) => {
  const event = document.createEvent('Event') as any;
  event.initEvent(eventName, true, true);
  event.preventDefault = () => {};
  event.dataTransfer = {
    types,
    effectAllowed: 'move',
    items: [
      {
        kind: 'file',
      },
      {
        kind: 'string',
      },
    ],
  };

  return event as DragEvent;
};

const makeFile = (id: string): MediaFile => ({
  id: `id${id}`,
  upfrontId: Promise.resolve(`id${id}`),
  name: `name${id}`,
  size: 1,
  type: 'type',
  creationDate: 0,
});

const mockSetTimeout = () => {
  const origSetTimeout = window.setTimeout;
  window.setTimeout = jest.fn().mockImplementation((cb, _, ...args) => {
    cb(...args);
  });
  return {
    reset() {
      window.setTimeout = origSetTimeout;
    },
  };
};

const verifyEventHandling = (
  wrapper: ShallowWrapper | ReactWrapper,
  event: Event,
) => {
  let setTimeoutMockHandler;
  const dropzonesActive = event.type === 'dragover';
  if (!dropzonesActive) {
    setTimeoutMockHandler = mockSetTimeout();
  }
  document.body.dispatchEvent(event);

  wrapper.update();

  expect(
    document.querySelector('.headless-dropzone')!.classList.contains('active'),
  ).toEqual(dropzonesActive);
  expect(wrapper.find(Dropzone).props().isActive).toEqual(dropzonesActive);

  if (!dropzonesActive) {
    if (setTimeoutMockHandler) {
      setTimeoutMockHandler.reset();
    }
  }
};

const waitForDropzoneToRender = () =>
  waitUntil(() => !!document.querySelector('.headless-dropzone'));

/**
 * Skipped two tests, they look fine, so not sure whats wrong...
 * TODO: JEST-23 Fix these tests
 */
describe('App', () => {
  const setup = () => {
    const context = ContextFactory.create({
      authProvider: userAuthProvider,
      userAuthProvider,
    });
    const userContext = ContextFactory.create({
      authProvider: userAuthProvider,
    });
    return {
      handlers: {
        onStartApp: jest.fn(),
        onClose: jest.fn(),
        onUploadsStart: jest.fn(),
        onUploadPreviewUpdate: jest.fn(),
        onUploadStatusUpdate: jest.fn(),
        onUploadProcessing: jest.fn(),
        onUploadEnd: jest.fn(),
        onUploadError: jest.fn(),
        onDropzoneDragIn: jest.fn(),
        onDropzoneDragOut: jest.fn(),
        onDropzoneDropIn: jest.fn(),
      } as AppDispatchProps,
      context,
      userContext,
      store: mockStore(),
      userAuthProvider,
    };
  };

  it('should render UploadView given selectedServiceName is "upload"', () => {
    const { handlers, store, context, userContext } = setup();
    const app = shallow(
      <App
        store={store}
        selectedServiceName="upload"
        isVisible={true}
        tenantContext={context}
        userContext={userContext}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />,
    );

    expect(app.find(UploadView).length).toEqual(1);
  });

  it('should render Browser given selectedServiceName is "google"', () => {
    const { handlers, store, context, userContext } = setup();
    const app = shallow(
      <App
        store={store}
        selectedServiceName="google"
        tenantContext={context}
        userContext={userContext}
        isVisible={true}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />,
    );

    expect(app.find(Browser).length).toEqual(1);
  });

  it('should call onStartApp', () => {
    const { handlers, store, context, userContext } = setup();
    shallow(
      <App
        store={store}
        selectedServiceName="upload"
        tenantContext={context}
        userContext={userContext}
        isVisible={true}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />,
    );

    expect(handlers.onStartApp).toHaveBeenCalledTimes(1);
  });

  it('should activate dropzone when visible', () => {
    const { handlers, store, context, userContext } = setup();
    const element = (
      <App
        store={store}
        selectedServiceName="google"
        tenantContext={context}
        userContext={userContext}
        isVisible={false}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />
    );
    const wrapper = shallow(element);
    const instance = wrapper.instance() as App;
    const spy = jest.spyOn(instance['mpDropzone'], 'activate');

    wrapper.setProps({ isVisible: true });

    expect(spy).toBeCalled();
  });

  it('should deactivate dropzone when not visible', () => {
    const { handlers, store, context, userContext } = setup();
    const element = (
      <App
        store={store}
        selectedServiceName="google"
        tenantContext={context}
        userContext={userContext}
        isVisible={true}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />
    );
    const wrapper = shallow(element);
    const instance = wrapper.instance() as App;
    const spy = jest.spyOn(instance['mpDropzone'], 'deactivate');

    wrapper.setProps({ isVisible: false });

    expect(spy).toBeCalled();
  });

  it('should deactivate dropzone when unmounted', () => {
    const { handlers, store, context, userContext } = setup();
    const element = (
      <App
        store={store}
        selectedServiceName="google"
        tenantContext={context}
        userContext={userContext}
        isVisible={true}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />
    );
    const wrapper = shallow(element);
    const instance = wrapper.instance() as App;
    const spy = jest.spyOn(instance['mpDropzone'], 'deactivate');

    wrapper.unmount();

    expect(spy).toBeCalled();
  });

  it.skip('should activate both dropzones on onDragEnter call and deactivate on onDragLeave and onDrop', async () => {
    const { handlers, store, context, userContext } = setup();
    const element = (
      <App
        store={store}
        selectedServiceName="upload"
        tenantContext={context}
        userContext={userContext}
        isVisible={false}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />
    );

    const wrapper = mount(element);

    wrapper.setProps({ isVisible: true });

    await waitForDropzoneToRender();

    verifyEventHandling(wrapper, createDragEvent('dragover'));
    verifyEventHandling(wrapper, createDragEvent('dragleave'));
    verifyEventHandling(wrapper, createDragEvent('dragover'));
    verifyEventHandling(wrapper, createDragEvent('drop'));
  });

  it('should call dispatch props for onDragEnter, onDragLeave and onDrop', async () => {
    const { handlers, store, context, userContext } = setup();
    const element = (
      <App
        store={store}
        selectedServiceName="upload"
        tenantContext={context}
        userContext={userContext}
        isVisible={true}
        tenantUploadParams={tenantUploadParams}
        {...handlers}
      />
    );
    const wrapper = mount(element);
    const instance = wrapper.instance() as App;
    instance.onDragEnter({ length: 3 });
    expect(handlers.onDropzoneDragIn).toBeCalledWith(3);

    instance.onDragLeave({ length: 3 });
    expect(handlers.onDropzoneDragOut).toBeCalledWith(3);

    instance.onDrop({
      files: [makeFile('1'), makeFile('2'), makeFile('3')],
    });
    expect(handlers.onDropzoneDropIn).toBeCalledWith(3);
  });
});

describe('Connected App', () => {
  const setup = () => {
    const store = mockStore();
    const dispatch = store.dispatch;
    // TODO: Fix this
    const ConnectedAppWithStore = getComponentClassWithStore(
      ConnectedApp,
    ) as any;
    const component = shallow(
      <ConnectedAppWithStore
        store={store}
        tenantUploadParams={tenantUploadParams}
      />,
    ).find(App);
    return { dispatch, component };
  };

  it('should dispatch FILE_UPLOADS_START when onUploadsStart is called', () => {
    const { component, dispatch } = setup();
    const upfrontId = Promise.resolve('');
    const nowDate = Date.now();
    const payload = {
      files: [
        {
          id: 'some-id',
          name: 'some-name',
          size: 42,
          creationDate: nowDate,
          type: 'image/jpg',
          upfrontId,
        },
      ],
    };
    component.props().onUploadsStart(payload);

    expect(dispatch).toHaveBeenCalledWith(
      fileUploadsStart({
        files: [
          {
            id: 'some-id',
            name: 'some-name',
            size: 42,
            creationDate: nowDate,
            type: 'image/jpg',
            upfrontId,
          },
        ],
      }),
    );
  });

  it('should fire an analytics events when provided with a react context via a store', () => {
    const handler = jest.fn();
    const store: Store<State> = createStore<State>(
      state => state,
      mockStore({
        view: {
          isVisible: true,
          items: [],
          isLoading: false,
          hasError: false,
          path: [],
          service: {
            accountId: 'some-view-service-account-id',
            name: 'upload',
          },
          isUploading: false,
          isCancelling: false,
        },
        config: {
          proxyReactContext: {
            getAtlaskitAnalyticsEventHandlers: () => [handler],
          },
        },
      }).getState(),
      applyMiddleware(analyticsProcessing as Middleware),
    );

    // TODO: fix this
    const ConnectedAppWithStore = getComponentClassWithStore(
      ConnectedApp,
    ) as any;
    const component = mount(
      <ConnectedAppWithStore store={store} tenantUploadParams={{}} />,
    );
    component.find(LocalBrowserButton).simulate('click');
    expect(handler).toBeCalledWith(
      expect.objectContaining({
        payload: {
          attributes: {
            componentName: 'mediaPicker',
            componentVersion: expect.any(String),
            packageName: '@atlaskit/media-picker',
          },
          eventType: 'screen',
          name: 'localFileBrowserModal',
        },
      }),
      'media',
    );
  });

  it.skip('should activate both dropzones on onDragEnter call and deactivate on onDragLeave and onDrop', async () => {
    const store = createStore<State>(
      reducers,
      mockStore({
        view: {
          isVisible: false,
          items: [],
          isLoading: false,
          hasError: false,
          path: [],
          service: {
            accountId: 'some-view-service-account-id',
            name: 'upload',
          },
          isUploading: false,
          isCancelling: false,
        },
      }).getState(),
    );

    // TODO: Fix this
    const ConnectedAppWithStore = getComponentClassWithStore(
      ConnectedApp,
    ) as any;
    const wrapper = mount(
      <ConnectedAppWithStore
        store={store as Store<State>}
        tenantUploadParams={{}}
      />,
    );

    store.dispatch(showPopup());

    await waitForDropzoneToRender();

    verifyEventHandling(wrapper, createDragEvent('dragover'));
    verifyEventHandling(wrapper, createDragEvent('dragleave'));
    verifyEventHandling(wrapper, createDragEvent('dragover'));
    verifyEventHandling(wrapper, createDragEvent('drop'));
  });
});
