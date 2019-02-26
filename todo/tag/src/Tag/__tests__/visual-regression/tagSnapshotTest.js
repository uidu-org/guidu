// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Tag-basic should match production example', async () => {
    const url = getExampleUrl('core', 'tag', 'basic', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
  it('Tag-color should match production example', async () => {
    const url = getExampleUrl('core', 'tag', 'color', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
