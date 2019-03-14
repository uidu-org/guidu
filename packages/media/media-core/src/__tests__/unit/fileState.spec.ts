import { isErrorFileState } from '../../fileState';
import { ErrorFileState, ProcessingFailedState } from '../../../index';

describe('isErrorFileState()', () => {
  const processingFailedState: ProcessingFailedState = {
    status: 'failed-processing',
    id: 'some-id',
    name: 'some-name',
    size: 42,
    artifacts: {},
    mediaType: 'image',
    mimeType: 'some-mime-type',
  };

  const errorState: ErrorFileState = {
    status: 'error',
    id: 'some-id',
  };
  it('should return true when it is an error file state', () => {
    expect(isErrorFileState(errorState)).toBe(true);
  });
  it('should return false when it is not an error file state', () => {
    expect(isErrorFileState(processingFailedState)).toBe(false);
  });
});
