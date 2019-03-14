import { FileIdentifier, isFileIdentifier } from '@uidu/media-core';

const fileIdentifier: FileIdentifier = {
  mediaItemType: 'file',
  id: 'some-id',
};

describe('isFileIdentifier', () => {
  it('should return true when it is a file identifier', () => {
    expect(isFileIdentifier(fileIdentifier)).toBe(true);
  });
});
