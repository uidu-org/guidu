import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('ButtonAppearances should match snapshot', async () => {
    const url = getExampleUrl(
      'core',
      'button',
      'Appearances',
      // @ts-ignore
      global.__BASEURL__,
    );
    // @ts-ignore
    const image = await takeScreenShot(global.page, url);
    expect(image).toMatchProdImageSnapshot();
  });
});
