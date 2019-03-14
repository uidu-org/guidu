import {
  SCREEN_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  GasCorePayload,
} from '@atlaskit/analytics-gas-types';
import { Action, Dispatch } from 'redux';
import { State } from '../../../domain';
import analyticsProcessing from '../../analyticsProcessing';
import { mockStore } from '@uidu/media-test-helpers';
import { showPopup } from '../../../actions/showPopup';
import { editorShowImage } from '../../../actions/editorShowImage';
import { searchGiphy } from '../../../actions';
import { fileListUpdate } from '../../../actions/fileListUpdate';
import { startAuth } from '../../../actions/startAuth';
import { ServiceName } from '../../../domain';
import { hidePopup } from '../../../actions/hidePopup';
import { changeService } from '../../../actions/changeService';
import { editRemoteImage } from '../../../actions/editRemoteImage';
import { editorClose } from '../../../actions/editorClose';
import { fileUploadsStart } from '../../../actions/fileUploadsStart';
import { handleCloudFetchingEvent } from '../../../actions/handleCloudFetchingEvent';
import { fileUploadEnd } from '../../../actions/fileUploadEnd';
import { startFileBrowser } from '../../../actions/startFileBrowser';
import { GET_PREVIEW } from '../../../actions/getPreview';
import { MediaFile } from '../../../../domain/file';
import { buttonClickPayload, Payload } from '../../analyticsHandlers';
import { fileUploadError } from '../../../actions/fileUploadError';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';

type TestPayload = GasCorePayload & { action: string; attributes: {} };
type UploadType = 'cloudMedia' | 'localMedia';

const GOOGLE: ServiceName = 'google';
const DROPBOX: ServiceName = 'dropbox';
const GIPHY: ServiceName = 'giphy';
const UPLOAD: ServiceName = 'upload';

const testFile1: MediaFile = {
  id: 'id1',
  name: 'file1',
  size: 1,
  creationDate: 1,
  type: 'type1',
  userUpfrontId: Promise.resolve('id1'),
  upfrontId: Promise.resolve('id1'),
};

const testFile2: MediaFile = {
  id: 'id2',
  name: 'file2',
  size: 2,
  creationDate: 2,
  type: 'type2',
  upfrontId: Promise.resolve('id2'),
};

const attributes = {
  componentName: 'mediaPicker',
  componentVersion: expect.any(String),
  packageName: '@atlaskit/media-picker',
};

const makePayloadForOperationalFileUpload = (
  file: MediaFile,
  uploadType: UploadType,
): TestPayload => ({
  action: 'commenced',
  actionSubject: 'mediaUpload',
  actionSubjectId: uploadType,
  attributes: {
    fileAttributes: {
      fileSize: file.size,
      fileMimetype: file.type,
      fileSource: 'mediapicker',
    },
    ...attributes,
  },
  eventType: OPERATIONAL_EVENT_TYPE,
});

const makePayloadForTrackFileConversion = (
  file: MediaFile,
  uploadType: UploadType,
  status: 'success' | 'fail',
  failReason?: string,
): TestPayload => ({
  action: 'uploaded',
  actionSubject: 'mediaUpload',
  actionSubjectId: uploadType,
  attributes: {
    fileAttributes: {
      fileSize: file.size,
      fileMimetype: file.type,
      fileSource: 'mediapicker',
    },
    status,
    uploadDurationMsec: 42,
    ...attributes,
    failReason,
  },
  eventType: TRACK_EVENT_TYPE,
});

describe('analyticsProcessing middleware', () => {
  let oldDateNowFn: () => number;
  let mockAnalyticsHandler: UIAnalyticsEventHandlerSignature;
  let next: Dispatch<State>;

  const setupStore = (state: Partial<State> = {}) =>
    mockStore({
      config: {
        proxyReactContext: {
          getAtlaskitAnalyticsContext: jest.fn(),
          getAtlaskitAnalyticsEventHandlers: () => [mockAnalyticsHandler],
        },
      },
      ...state,
    });

  const verifyAnalyticsCall = (
    actionUnderTest: Action,
    payload: Payload,
    stateOverride: Partial<State> = {},
  ) => {
    const store = setupStore(stateOverride);
    analyticsProcessing(store)(next)(actionUnderTest);
    expect(mockAnalyticsHandler).toBeCalledWith(
      expect.objectContaining({
        payload,
      }),
      'media',
    );
    expect(next).toBeCalledWith(actionUnderTest);
  };

  beforeAll(() => {
    oldDateNowFn = Date.now;
    Date.now = jest.fn(() => 42);
  });

  afterAll(() => {
    Date.now = oldDateNowFn;
  });

  beforeEach(() => {
    mockAnalyticsHandler = jest.fn();
    next = jest.fn();
  });

  it('should process action showPopup, fire 2 events', () => {
    verifyAnalyticsCall(showPopup(), {
      name: 'recentFilesBrowserModal',
      eventType: SCREEN_EVENT_TYPE,
      attributes,
    });
    verifyAnalyticsCall(showPopup(), {
      name: 'mediaPickerModal',
      eventType: SCREEN_EVENT_TYPE,
      attributes,
    });
  });

  it('should process action editorShowImage, fire 1 event', () => {
    verifyAnalyticsCall(editorShowImage(''), {
      name: 'fileEditorModal',
      eventType: SCREEN_EVENT_TYPE,
      attributes,
    });
  });

  it('should process action searchGiphy with any url, fire 1 event', () => {
    verifyAnalyticsCall(searchGiphy('', true), {
      name: 'cloudBrowserModal',
      attributes: {
        cloudType: GIPHY,
        ...attributes,
      },
      eventType: SCREEN_EVENT_TYPE,
    });
  });

  it('should process action fileListUpdate for google service, fire 1 event', () => {
    verifyAnalyticsCall(fileListUpdate('', [], [], GOOGLE), {
      name: 'cloudBrowserModal',
      attributes: {
        cloudType: GOOGLE,
        ...attributes,
      },
      eventType: SCREEN_EVENT_TYPE,
    });
  });

  it('should process action startFileBrowser, fire 2 events', () => {
    verifyAnalyticsCall(startFileBrowser(), {
      name: 'localFileBrowserModal',
      eventType: SCREEN_EVENT_TYPE,
      attributes,
    });
    verifyAnalyticsCall(startFileBrowser(), {
      ...buttonClickPayload,
      actionSubjectId: 'localFileBrowserButton',
      attributes,
    });
  });

  it('should process action fileListUpdate for dropbox, fire 1 event', () => {
    verifyAnalyticsCall(fileListUpdate('', [], [], DROPBOX), {
      name: 'cloudBrowserModal',
      attributes: {
        cloudType: DROPBOX,
        ...attributes,
      },
      eventType: SCREEN_EVENT_TYPE,
    });
  });

  it('should process action startAuth for google, fire 1 event', () => {
    verifyAnalyticsCall(startAuth(GOOGLE), {
      ...buttonClickPayload,
      actionSubjectId: 'linkCloudAccountButton',
      attributes: {
        cloudType: GOOGLE,
        ...attributes,
      },
    });
  });

  it('should process action startAuth for dropbox, fire 1 event', () => {
    verifyAnalyticsCall(startAuth(DROPBOX), {
      ...buttonClickPayload,
      actionSubjectId: 'linkCloudAccountButton',
      attributes: {
        cloudType: DROPBOX,
        ...attributes,
      },
    });
  });

  it('should process action hidePopup for cancellation, fire 1 event', () => {
    verifyAnalyticsCall(hidePopup(), {
      ...buttonClickPayload,
      actionSubjectId: 'cancelButton',
      attributes: {
        fileCount: 0,
        ...attributes,
      },
    });
  });

  it('should process action hidePopup for insert of 1 file, fire 1 event with fileCount=1', () => {
    verifyAnalyticsCall(
      hidePopup(),
      {
        ...buttonClickPayload,
        actionSubjectId: 'insertFilesButton',
        attributes: {
          fileCount: 1,
          ...attributes,
        },
      },
      {
        selectedItems: [
          {
            mimeType: '',
            id: '',
            name: '',
            size: 0,
            date: 0,
            serviceName: UPLOAD,
            upfrontId: Promise.resolve(''),
          },
        ],
      },
    );
  });

  it('should process action hidePopup for insert of 2 files, fire 1 event with fileCount=2', () => {
    verifyAnalyticsCall(
      hidePopup(),
      {
        ...buttonClickPayload,
        actionSubjectId: 'insertFilesButton',
        attributes: {
          fileCount: 2,
          ...attributes,
        },
      },
      {
        selectedItems: [
          {
            mimeType: '',
            id: '',
            name: '',
            size: 0,
            date: 0,
            serviceName: UPLOAD,
            upfrontId: Promise.resolve(''),
          },
          {
            mimeType: '',
            id: '',
            name: '',
            size: 0,
            date: 0,
            serviceName: UPLOAD,
            upfrontId: Promise.resolve(''),
          },
        ],
      },
    );
  });

  it('should process action changeService for upload, fire 2 events', () => {
    verifyAnalyticsCall(changeService(UPLOAD), {
      ...buttonClickPayload,
      actionSubjectId: 'uploadButton',
      attributes,
    });
    verifyAnalyticsCall(changeService(UPLOAD), {
      name: 'recentFilesBrowserModal',
      eventType: SCREEN_EVENT_TYPE,
      attributes,
    });
  });

  it('should process action changeService for google, fire 1 event', () => {
    verifyAnalyticsCall(changeService(GOOGLE), {
      ...buttonClickPayload,
      actionSubjectId: 'cloudBrowserButton',
      attributes: {
        cloudType: GOOGLE,
        ...attributes,
      },
    });
  });

  it('should process action changeService for dropbox, fire 1 event', () => {
    verifyAnalyticsCall(changeService(DROPBOX), {
      ...buttonClickPayload,
      actionSubjectId: 'cloudBrowserButton',
      attributes: {
        cloudType: DROPBOX,
        ...attributes,
      },
    });
  });

  it('should process action changeService for giphy, fire 1 event', () => {
    verifyAnalyticsCall(changeService(GIPHY), {
      ...buttonClickPayload,
      actionSubjectId: 'cloudBrowserButton',
      attributes: {
        cloudType: GIPHY,
        ...attributes,
      },
    });
  });

  it('should process action editRemoteImage, fire 1 event', () => {
    verifyAnalyticsCall(
      editRemoteImage(
        {
          id: '',
          name: '',
        },
        '',
      ),
      {
        ...buttonClickPayload,
        actionSubjectId: 'annotateFileButton',
        attributes,
      },
    );
  });

  it('should process action editorClose with "Save" selection, fire 1 event', () => {
    verifyAnalyticsCall(editorClose('Save'), {
      ...buttonClickPayload,
      actionSubjectId: 'mediaEditorSaveButton',
      attributes,
    });
  });

  it('should process action editorClose with "Close" selection, fire 1 event', () => {
    verifyAnalyticsCall(editorClose('Close'), {
      ...buttonClickPayload,
      actionSubjectId: 'mediaEditorCloseButton',
      attributes,
    });
  });

  it('should process action fileUploadsStart with 1 file, fire 1 event', () => {
    verifyAnalyticsCall(
      fileUploadsStart({
        files: [testFile1],
      }),
      {
        action: 'commenced',
        actionSubject: 'mediaUpload',
        actionSubjectId: 'localMedia',
        attributes: {
          fileAttributes: {
            fileSize: 1,
            fileMimetype: 'type1',
            fileSource: 'mediapicker',
          },
          ...attributes,
        },
        eventType: OPERATIONAL_EVENT_TYPE,
      },
    );
  });

  it('should process action fileUploadsStart with 2 files, fire 2 events', () => {
    verifyAnalyticsCall(
      fileUploadsStart({
        files: [testFile1, testFile2],
      }),
      makePayloadForOperationalFileUpload(testFile1, 'localMedia'),
    );
    verifyAnalyticsCall(
      fileUploadsStart({
        files: [testFile1, testFile2],
      }),
      makePayloadForOperationalFileUpload(testFile2, 'localMedia'),
    );
  });

  it('should process action handleCloudFetchingEvent with 1 upload, fire 1 event', () => {
    verifyAnalyticsCall(
      handleCloudFetchingEvent(testFile1, 'RemoteUploadStart', {
        uploadId: 'upid1',
      }),
      makePayloadForOperationalFileUpload(testFile1, 'cloudMedia'),
    );
  });

  it('should process action handleCloudFetchingEvent with RemoteUploadEnd event for 1 upload, fire 1 event', () => {
    verifyAnalyticsCall(
      handleCloudFetchingEvent(testFile1, 'RemoteUploadEnd', {
        fileId: 'id1',
        uploadId: 'upid1',
      }),
      makePayloadForTrackFileConversion(testFile1, 'cloudMedia', 'success'),
      {
        remoteUploads: {
          upid1: {
            timeStarted: 0,
          },
        },
      },
    );
  });

  it('should process action handleCloudFetchingEvent with RemoteUploadFail event for 1 upload, fire 1 event', () => {
    verifyAnalyticsCall(
      handleCloudFetchingEvent(testFile1, 'RemoteUploadFail', {
        description: 'id1 failed',
        uploadId: 'upid1',
      }),
      makePayloadForTrackFileConversion(testFile1, 'cloudMedia', 'fail'),
      {
        remoteUploads: {
          upid1: {
            timeStarted: 0,
          },
        },
      },
    );
  });

  it('should process action fileUploadEnd with success, fire 1 event', () => {
    const payload = makePayloadForTrackFileConversion(
      testFile1,
      'localMedia',
      'success',
    );
    const fileAttributes = {
      ...payload.attributes.fileAttributes,
      fileMediatype: 'image',
      fileState: 'succeeded',
      fileStatus: 'converted',
    };
    verifyAnalyticsCall(
      fileUploadEnd({
        file: testFile1,
        public: {
          id: 'id1',
          name: 'file1',
          size: 1,
          mimeType: 'type1',
          mediaType: 'image',
          processingStatus: 'succeeded',
        },
      }),
      {
        ...payload,
        attributes: {
          ...payload.attributes,
          fileAttributes,
        },
      },
      {
        uploads: {
          id1: {
            file: {
              metadata: {
                id: 'id1',
                name: 'file1',
                size: 1,
                mimeType: 'type1',
                upfrontId: Promise.resolve(''),
                userUpfrontId: Promise.resolve(''),
                userOccurrenceKey: Promise.resolve(''),
              },
            },
            events: [
              {
                data: {
                  file: testFile1,
                  public: {
                    id: 'id1',
                    name: 'file1',
                    size: 1,
                    mimeType: testFile1.type,
                    mediaType: 'image',
                    processingStatus: 'succeeded',
                  },
                },
                name: 'upload-end',
              },
            ],
            index: 0,
            timeStarted: 0,
            progress: null,
          },
        },
      },
    );
  });

  it('should process action fileUploadError with one file, fire 1 event', () => {
    const payload = makePayloadForTrackFileConversion(
      testFile1,
      'localMedia',
      'fail',
      'foo',
    );
    delete payload.attributes.fileAttributes.fileMimetype;
    verifyAnalyticsCall(
      fileUploadError({
        file: {
          ...testFile1,
        },
        error: {
          description: 'foo',
          name: 'object_create_fail',
        },
      }),
      payload,
      {
        uploads: {
          id1: {
            file: {
              metadata: {
                id: 'id1',
                name: 'file1',
                size: 1,
                mimeType: 'type1',
                upfrontId: Promise.resolve(''),
                userUpfrontId: Promise.resolve(''),
                userOccurrenceKey: Promise.resolve(''),
              },
            },
            events: [
              {
                data: {
                  file: testFile1,
                  error: {
                    name: 'object_create_fail',
                    description: 'foo',
                    fileId: 'id1',
                  },
                },
                name: 'upload-error',
              },
            ],
            index: 0,
            timeStarted: 0,
            progress: null,
          },
        },
      },
    );
  });

  it("should not handle action it doesn't know about", () => {
    const mockAnalyticsHandler = jest.fn();
    const store = mockStore({
      config: {
        proxyReactContext: {
          getAtlaskitAnalyticsContext: jest.fn(),
          getAtlaskitAnalyticsEventHandlers: () => [mockAnalyticsHandler],
        },
      },
    });
    analyticsProcessing(store)(next)({ type: 'BOGUS_ACTION' });
    expect(mockAnalyticsHandler.mock.calls.length).toBe(0);
  });

  it("should not handle action that doesn't have event for it", () => {
    const mockAnalyticsHandler = jest.fn();
    const store = mockStore({
      config: {
        proxyReactContext: {
          getAtlaskitAnalyticsContext: jest.fn(),
          getAtlaskitAnalyticsEventHandlers: () => [mockAnalyticsHandler],
        },
      },
    });
    analyticsProcessing(store)(next)({ type: GET_PREVIEW });
    expect(mockAnalyticsHandler.mock.calls.length).toBe(0);
  });
});
