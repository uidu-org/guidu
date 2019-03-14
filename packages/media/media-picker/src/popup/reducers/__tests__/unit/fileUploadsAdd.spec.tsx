import fileUploadsAdd from '../../fileUploadsAdd';
import { mockState } from '@uidu/media-test-helpers';
import { LocalUpload, State } from '../../../domain/index';
import { fileUploadsStart } from '../../../actions/fileUploadsStart';
import { MediaFile } from '../../../../domain/file';

describe('fileUploadsAdd() reducer', () => {
  const MOCK_TIMESTAMP = Date.now();
  let dateNowSpy: jest.SpyInstance<any>;

  beforeAll(() => {
    // Lock Time
    dateNowSpy = jest.spyOn(Date, 'now');
    dateNowSpy.mockImplementation(() => MOCK_TIMESTAMP);
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  const nowDate = Date.now();
  const upfrontId = Promise.resolve('1');
  const occurrenceKey = 'key';
  const file1: MediaFile = {
    name: 'some-file1.ext',
    id: 'some-id1',
    type: 'image/some',
    creationDate: nowDate,
    size: 42,
    upfrontId,
    occurrenceKey,
    userUpfrontId: Promise.resolve(''),
    userOccurrenceKey: Promise.resolve(''),
  };
  const file2: MediaFile = {
    name: 'some-file2.ext',
    id: 'some-id2',
    type: 'image/some',
    creationDate: nowDate,
    size: 42,
    upfrontId,
    occurrenceKey,
    userUpfrontId: Promise.resolve(''),
    userOccurrenceKey: Promise.resolve(''),
  };

  it('returns same state if action has different type', () => {
    const oldState: State = { ...mockState };
    const newState = fileUploadsAdd(oldState, { type: 'SOME_OTHER_TYPE' });
    expect(newState).toEqual(mockState);
  });

  it('should add new uploads items', () => {
    const oldState: State = { ...mockState };
    const newState = fileUploadsAdd(
      oldState,
      fileUploadsStart({
        files: [file1, file2],
      }),
    );
    expect(Object.keys(newState.uploads)).toHaveLength(2);
    const expectedUpload: LocalUpload = {
      file: {
        metadata: {
          id: 'some-id1',
          name: 'some-file1.ext',
          mimeType: 'image/some',
          size: 42,
          upfrontId,
          occurrenceKey,
          userUpfrontId: expect.any(Promise),
          userOccurrenceKey: expect.any(Promise),
        },
      },
      progress: 0,
      timeStarted: MOCK_TIMESTAMP,
      events: [],
      index: 0,
    };
    expect(newState.uploads['some-id1']).toEqual(expectedUpload);
    expect(newState.uploads['some-id2'].index).toEqual(1);
  });

  it('should add new selected items', () => {
    const oldState: State = { ...mockState };
    const newState = fileUploadsAdd(
      oldState,
      fileUploadsStart({
        files: [file1, file2],
      }),
    );
    expect(newState.selectedItems).toHaveLength(2);
    expect(newState.selectedItems[0]).toEqual({
      date: 0,
      id: 'some-id1',
      mimeType: 'image/some',
      name: 'some-file1.ext',
      parentId: '',
      size: 42,
      serviceName: 'upload',
      upfrontId,
      occurrenceKey,
    });
  });

  it('should have new lastUploadIndex', () => {
    const oldState: State = { ...mockState };
    const newState = fileUploadsAdd(
      oldState,
      fileUploadsStart({
        files: [file1, file2],
      }),
    );
    expect(newState.lastUploadIndex).toEqual(2);
  });
});
