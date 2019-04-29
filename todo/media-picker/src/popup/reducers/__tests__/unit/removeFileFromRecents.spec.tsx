import removeFileFromRecents from '../../removeFileFromRecents';
import { removeFileFromRecents as removeFileFromRecentsAction } from '../../../actions/removeFileFromRecents';
import { mockState } from '@uidu/media-test-helpers';
import { State } from '../../../domain';

const extraState: Partial<State> = {
  uploads: {
    'some-id': {
      file: {
        metadata: {
          id: 'some-id',
          mimeType: 'some-type',
          name: 'some-name',
          size: 42,
          upfrontId: Promise.resolve('some-local-upfront-file-id'),
          userUpfrontId: Promise.resolve(''),
          userOccurrenceKey: Promise.resolve(''),
        },
      },
      events: [],
      index: 0,
      timeStarted: 42,
      progress: null,
    },
    'other-upload-id': {
      file: {
        metadata: {
          id: 'some-other-local-file-id',
          mimeType: 'some-type',
          name: 'some-name',
          size: 42,
          upfrontId: Promise.resolve('some-other-local-upfront-file-id'),
          userUpfrontId: Promise.resolve(''),
          userOccurrenceKey: Promise.resolve(''),
        },
      },
      events: [],
      index: 0,
      timeStarted: 42,
      progress: null,
    },
  },
  recents: {
    items: [
      {
        id: 'some-id',
        insertedAt: 42,
        occurrenceKey: 'some-other-occurrence-key',
        details: {} as any,
      },
      {
        id: 'other-id',
        insertedAt: 42,
        occurrenceKey: 'some-other-occurrence-key',
        details: {} as any,
      },
    ],
  },
  selectedItems: [
    {
      serviceName: 'recent_files',
      mimeType: 'some-type',
      id: 'some-id',
      upfrontId: Promise.resolve('some-id'),
      name: 'some-name',
      size: 42,
      date: 44,
      occurrenceKey: 'some-other-occurrence-key',
    },
    {
      serviceName: 'upload',
      mimeType: 'some-other-type',
      id: 'other-id',
      upfrontId: Promise.resolve('other-id'),
      name: 'some-other-name',
      size: 42,
      date: 44,
      occurrenceKey: 'some-other-occurrence-key',
    },
  ],
};

describe('removeFileFromRecents reducer', () => {
  let state: State;
  let resultState: State;

  beforeEach(() => {
    const removeFromRecents = removeFileFromRecentsAction(
      'some-id',
      'occurrence-key',
    );
    const removeFromLocalUploads = removeFileFromRecentsAction(
      'some-local-upfront-file-id',
      'occurrence-key',
    );
    state = {
      ...mockState,
      ...extraState,
    };
    state = removeFileFromRecents(state, removeFromRecents);
    resultState = removeFileFromRecents(state, removeFromLocalUploads);
  });

  it('should remove item from selected list', () => {
    expect(resultState.selectedItems).toHaveLength(1);
    expect(resultState.selectedItems[0].id).toEqual('other-id');
  });
  it('should remove local upload item', () => {
    expect(Object.keys(resultState.uploads)).toHaveLength(1);
    expect(Object.keys(resultState.uploads)[0]).toEqual('other-upload-id');
  });
});
