jest.mock('react-dom');
import { ContextFactory } from '@uidu/media-core';
import { render } from 'react-dom';
import { PopupConfig } from '../../types';
import { PopupImpl } from '../../popup';
import { UploadParams } from '../../..';

describe('MediaPickerPopup', () => {
  const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: '',
        token: '',
        baseUrl: 'some-api-url',
      }),
    userAuthProvider: () =>
      Promise.resolve({
        clientId: 'some-client-id',
        token: 'some-token',
        baseUrl: 'some-api-url',
      }),
  });
  const popupConfig: PopupConfig = {
    uploadParams: {
      collection: '',
    },
  };

  beforeEach(() => {
    (render as jest.Mock).mockReset();
  });

  describe('constructor', () => {
    it('sets uploadParams to the default when none are supplied', () => {
      const mediaPicker = new PopupImpl(context, popupConfig);

      const expectedUploadParams: UploadParams = {
        collection: '',
      };
      expect((mediaPicker as any)[
        'tenantUploadParams'
      ] as UploadParams).toEqual(expectedUploadParams);
    });

    it('merges uploadParams with the defaults when they are supplied', () => {
      const newUploadParams: UploadParams = {
        collection: 'hello-world',
      };
      const mediaPicker = new PopupImpl(context, {
        ...popupConfig,
        uploadParams: newUploadParams,
      });

      expect((mediaPicker as any)[
        'tenantUploadParams'
      ] as UploadParams).toEqual({
        collection: 'hello-world',
      });
    });
  });

  describe('setUploadParams', () => {
    it('updates collection uploadParam when it is supplied', () => {
      const collection = 'some-collection-name';
      const newUploadParams: UploadParams = { collection };

      const mediaPicker = new PopupImpl(context, popupConfig);
      mediaPicker.setUploadParams(newUploadParams);

      expect(
        ((mediaPicker as any)['tenantUploadParams'] as UploadParams).collection,
      ).toEqual(collection);
    });
  });

  describe('hide', () => {
    it('fires a closed event when the popup is hidden', () => {
      const mediaPicker = new PopupImpl(context, popupConfig);
      const emitSpy = jest.fn();

      mediaPicker.emit = emitSpy;

      mediaPicker.hide();
      expect(emitSpy).toHaveBeenCalled();
      expect(emitSpy.mock.calls[0][0]).toEqual('closed');
    });
  });

  describe('render', () => {
    it('should render <App /> with the right properties', () => {
      const mediaPicker = new PopupImpl(context, popupConfig) as any;

      expect((render as jest.Mock).mock.calls[0][0].props).toEqual({
        proxyReactContext: undefined,
        store: mediaPicker.store,
        tenantUploadParams: {
          collection: '',
        },
      });
    });
  });
});
