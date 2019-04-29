import { AuthProvider, ContextFactory } from '@uidu/media-core';
import { MediaPicker } from '../..';
import { PopupImpl } from '../../components/popup';
import { BinaryUploaderImpl } from '../../components/binary';
import { BrowserImpl } from '../../components/browser';
import { ClipboardImpl } from '../../components/clipboard';
import { DropzoneImpl } from '../../components/dropzone';
import { PopupConfig } from '../../components/types';

/**
 * These specs should describe the public API.
 */
describe('MediaPicker', () => {
  const container = document.createElement('div');
  const userAuthProvider: AuthProvider = () =>
    Promise.resolve({
      clientId: 'some-client-id',
      token: 'some-token',
      baseUrl: 'some-api-url',
    });
  const context = ContextFactory.create({
    userAuthProvider,
    authProvider: () =>
      Promise.resolve({
        clientId: 'some-client-id',
        token: 'some-token',
        baseUrl: 'some-api-url',
      }),
  });
  const config = {
    uploadParams: {
      collection: 'some-collection',
    },
  };

  describe('binary', () => {
    it('should be instance of MediaPickerBinaryUploader given options', async () => {
      const binary = await MediaPicker('binary', context, config);

      expect(binary).toBeInstanceOf(BinaryUploaderImpl);
    });

    it('should be able to register listeners to generic upload events', async () => {
      const binary = await MediaPicker('binary', context, config);
      binary.on('upload-status-update', () => {});
      binary.on('upload-preview-update', () => {});
      binary.on('upload-processing', () => {});
      binary.on('upload-end', () => {});
      binary.on('upload-error', () => {});
    });
  });

  describe('browser', () => {
    it('should be instance of MediaPickerBrowser given just module config', async () => {
      const browser = await MediaPicker('browser', context, config);

      expect(browser).toBeInstanceOf(BrowserImpl);
    });

    it('should be instance of MediaPickerBrowser given moduleConfig and pickerConfig', async () => {
      const browser = await MediaPicker('browser', context, {
        ...config,
        multiple: true,
        fileExtensions: ['image/jpeg', 'image/png'],
      });

      expect(browser).toBeInstanceOf(BrowserImpl);
    });

    // it('should be a class constructor given no options', () => {
    //   expect(MediaPicker('browser')).toEqual(Browser);
    // });

    it('should be able to register listeners to generic upload events', async () => {
      const browser = await MediaPicker('browser', context, config);

      browser.on('uploads-start', () => {});
      browser.on('upload-status-update', () => {});
      browser.on('upload-preview-update', () => {});
      browser.on('upload-processing', () => {});
      browser.on('upload-end', () => {});
      browser.on('upload-error', () => {});
    });
  });

  describe('clipboard', () => {
    it('should be instance of MediaPickerClipboard given options', async () => {
      const clipboard = await MediaPicker('clipboard', context, config);

      expect(clipboard).toBeInstanceOf(ClipboardImpl);
    });

    // it('should be a class constructor given no options', () => {
    //   expect(MediaPicker('clipboard')).toEqual(Clipboard);
    // });

    it('should be able to register listeners to generic upload events', async () => {
      const clipboard = await MediaPicker('clipboard', context, config);

      clipboard.on('uploads-start', () => {});
      clipboard.on('upload-status-update', () => {});
      clipboard.on('upload-preview-update', () => {});
      clipboard.on('upload-processing', () => {});
      clipboard.on('upload-end', () => {});
      clipboard.on('upload-error', () => {});
    });
  });

  describe('dropzone', () => {
    it('should be instance of MediaPickerDropzone given just moduleConfig', async () => {
      const dropzone = await MediaPicker('dropzone', context, config);

      expect(dropzone).toBeInstanceOf(DropzoneImpl);
    });

    it('should be instance of MediaPickerDropzone given moduleConfig and pickerConfig', async () => {
      const dropzone = await MediaPicker('dropzone', context, {
        ...config,
        container,
      });

      expect(dropzone).toBeInstanceOf(DropzoneImpl);
    });

    // it('should be a class constructor given no options', () => {
    //   expect(MediaPicker('dropzone')).toEqual(Dropzone);
    // });

    it('should be able to register listeners to generic upload events', async () => {
      const dropzone = await MediaPicker('dropzone', context, config);

      dropzone.on('uploads-start', () => {});
      dropzone.on('upload-status-update', () => {});
      dropzone.on('upload-preview-update', () => {});
      dropzone.on('upload-processing', () => {});
      dropzone.on('upload-end', () => {});
      dropzone.on('upload-error', () => {});
    });

    it('consumers should be able to listen for "drop", "drag-enter" and "drag-leave" events', async () => {
      const dropzone = await MediaPicker('dropzone', context, config);

      dropzone.on('drop', () => {});
      dropzone.on('drag-enter', () => {});
      dropzone.on('drag-leave', () => {});
    });
  });

  describe('popup', () => {
    const popupConfig: PopupConfig = { ...config, container };

    it('should be instance of MediaPickerPopup given options', async () => {
      const popup = await MediaPicker('popup', context, popupConfig);

      expect(popup).toBeInstanceOf(PopupImpl);
    });

    // it('should be a class constructor given no options', () => {
    //   expect(MediaPicker('popup')).toEqual(PopupImpl);
    // });

    it('should be able to register listeners to generic upload events', async () => {
      const popup = await MediaPicker('popup', context, popupConfig);

      popup.on('uploads-start', () => {});
      popup.on('upload-status-update', () => {});
      popup.on('upload-preview-update', () => {});
      popup.on('upload-processing', () => {});
      popup.on('upload-end', () => {});
      popup.on('upload-error', () => {});
    });
  });
});
