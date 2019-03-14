import { dataURItoFile, fileToDataURI } from '../../util';
import { tallImage } from '@uidu/media-test-helpers';

describe('dataURItoFile, fileToDataURI Util', () => {
  const tallImageFile = dataURItoFile(tallImage);

  it('should convert dataURI to File', () => {
    expect(tallImageFile).toBeInstanceOf(File);
    // TODO: https://product-fabric.atlassian.net/browse/MSW-398
  });

  it('should convert File to dataURI', async () => {
    const dataURI = await fileToDataURI(tallImageFile);
    expect(dataURI).toBe(tallImage);
  });
});
