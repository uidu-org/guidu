import { EventEmitter2 } from 'eventemitter2';
import { defaultBaseUrl } from '@uidu/media-test-helpers';
import { ContextFactory } from '@uidu/media-core';
import { DropzoneConfig, MediaPicker } from '../../../../index';
import { Dropzone, DropzoneDragEnterEventPayload } from '../../../types';
import * as uploadService from '../../../../service/newUploadServiceImpl';

const context = ContextFactory.create({
  authProvider: () =>
    Promise.resolve({
      clientId: '603c5433-35c4-4346-9a18-2acd3e8df980',
      token: 'some-token',
      baseUrl: defaultBaseUrl,
    }),
});

interface FakeUploadService extends EventEmitter2 {
  addDropzone?: () => void;
  removeDropzone?: () => void;
  addFiles?: () => void;
}
/**
 * Skipped 1 tests, looks like an actual failure, it's emiting an event thats never supposed to be
 * emitted
 * TODO: JEST-23 Fix these tests
 */
describe('Dropzone', () => {
  const container = document.createElement('DIV');
  const config: DropzoneConfig = {
    uploadParams: {
      collection: '',
    },
    container,
  };
  // Helper functions
  const createDragOverOrDropEvent = (
    eventName: 'dragover' | 'drop' | 'dragleave',
    type?: string,
  ) => {
    const event = document.createEvent('Event') as any;
    event.initEvent(eventName, true, true);
    event.preventDefault = () => {};
    event.dataTransfer = {
      types: [type || 'Files'],
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

    return event;
  };

  const createDragOverEvent = (type?: string) => {
    return createDragOverOrDropEvent('dragover', type);
  };

  const createDragLeaveEvent = () => {
    return createDragOverOrDropEvent('dragleave');
  };

  describe('activate', () => {
    it('injects drop zone into supplied container', async () => {
      const dropzone = await MediaPicker('dropzone', context, config);

      await dropzone.activate();
      expect(container.querySelectorAll('.mediaPickerDropzone').length).toEqual(
        1,
      );
    });

    it('injects drop zone into document.body if no container is supplied to constructor', async () => {
      const dropzone = await MediaPicker('dropzone', context);
      await dropzone.activate();
      expect(
        document.body.querySelectorAll('.mediaPickerDropzone').length,
      ).toEqual(1);
    });

    it('add "drop" event to container', async () => {
      let addEventListenerSpy: jest.SpyInstance<any>;
      addEventListenerSpy = jest.spyOn(container, 'addEventListener');
      const dropzone = await MediaPicker('dropzone', context, config);
      await dropzone.activate();
      const events = addEventListenerSpy.mock.calls.map(args => args[0]);
      expect(events).toContain('dragover');
      expect(events).toContain('dragleave');
      expect(events).toContain('drop');
    });

    describe('displays dropzone UI', () => {
      it('should append "active" class to .mediaPickerDropzone on "dragover"', async () => {
        const dragOver = createDragOverEvent();
        const dropzone = await MediaPicker('dropzone', context, config);

        await dropzone.activate();
        expect(
          container
            .querySelector('.mediaPickerDropzone')!
            .classList.contains('active'),
        ).toEqual(false);

        container.dispatchEvent(dragOver);
        expect(
          container
            .querySelector('.mediaPickerDropzone')!
            .classList.contains('active'),
        ).toEqual(true);
      });

      it('should remove "active" class to .mediaPickerDropzone on "dragover"', async () => {
        const dragOver = createDragOverEvent();
        const dragLeave = createDragLeaveEvent();
        const dropzone = await MediaPicker('dropzone', context, config);

        await dropzone.activate();
        container.dispatchEvent(dragOver);
        expect(
          container
            .querySelector('.mediaPickerDropzone')!
            .classList.contains('active'),
        ).toEqual(true);

        container.dispatchEvent(dragLeave);
        expect(
          container
            .querySelector('.mediaPickerDropzone')!
            .classList.contains('active'),
        ).toEqual(false);
      });
    });
  });

  describe('deactivate', () => {
    let removeEventListenerSpy: jest.SpyInstance<any>;
    let dropzone: Dropzone;

    beforeEach(async () => {
      removeEventListenerSpy = jest.spyOn(container, 'removeEventListener');
      dropzone = await MediaPicker('dropzone', context, {
        ...config,
        headless: true,
      });
    });

    it('removes "dragover", "dragleave" and "drop" events from container', async () => {
      await dropzone.activate();
      dropzone.deactivate();
      const events = removeEventListenerSpy.mock.calls.map(args => args[0]);
      expect(events).toContain('dragover');
      expect(events).toContain('dragleave');
      expect(events).toContain('drop');
    });
  });

  describe('MediaPickerDropzone emitted events', () => {
    let dropzone: Dropzone;
    let uploadServiceStub: jest.Mock;
    let someFakeUploadService: FakeUploadService;

    const stubUploadService = (fakeUploadService: FakeUploadService) => {
      uploadServiceStub = jest
        .spyOn(uploadService, 'NewUploadServiceImpl')
        .mockImplementation(() => fakeUploadService);
    };

    beforeEach(async () => {
      someFakeUploadService = new EventEmitter2();
      someFakeUploadService.addDropzone = () => {};
      someFakeUploadService.removeDropzone = () => {};
      someFakeUploadService.addFiles = () => {};
      stubUploadService(someFakeUploadService);

      dropzone = await MediaPicker('dropzone', context, config);
    });

    afterEach(() => {
      dropzone.deactivate();
      uploadServiceStub.mockReset();
    });

    it('should emit drag-enter for drag over with type "Files" and contain files length', async done => {
      const dropzone = await MediaPicker('dropzone', context, {
        ...config,
        headless: true,
      });

      await dropzone.activate();
      dropzone.on('drag-enter', (e: DropzoneDragEnterEventPayload) => {
        expect(e.length).toEqual(1);
        done();
      });

      container.dispatchEvent(createDragOverEvent());
    });

    it('should not emit drag-enter for drag over with type "Not Files"', async done => {
      const dropzone = await MediaPicker('dropzone', context, {
        ...config,
        headless: true,
      });

      await dropzone.activate();
      dropzone.on('drag-enter', () => {
        done(new Error('drag-enter should not be emitted'));
      });

      container.dispatchEvent(createDragOverEvent('Not Files'));
      done();
    });

    it.skip('should emit drag-leave for dragleave event', async done => {
      await dropzone.activate();

      dropzone.on('drag-leave', done);
      container.dispatchEvent(createDragOverEvent());
      container.dispatchEvent(createDragLeaveEvent());
    });

    it('should not emit drag-leave for dragleave event if there was no dragover', async () => {
      await dropzone.activate();

      dropzone.on('drag-leave', () => {
        throw new Error('drag-leave should not be emitted');
      });

      container.dispatchEvent(createDragLeaveEvent());
    });

    it('should upload files when files are dropped', async () => {
      const dropzone = await MediaPicker('dropzone', context, config);
      const spy = jest.spyOn(dropzone['uploadService'], 'addFiles');
      await dropzone.activate();

      const event = new Event('drop') as any;
      const files = [new File([], '')];
      event.dataTransfer = {
        types: [],
        files,
      };
      (dropzone as any)['onFileDropped'](event);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toBeCalledWith(files);
    });
  });
});
