// @flow
import { getExampleUrl, takeScreenShot } from '@uidu/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Lozenge basic example should match production example', async () => {
    const url = getExampleUrl('core', 'lozenge', 'basic', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
