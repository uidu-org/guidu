// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it(`Basic example should match prod`, async () => {
    const url = getExampleUrl('core', 'tabs', 'basic', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
