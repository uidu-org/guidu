// @flow
import { getExampleUrl, takeScreenShot } from '@uidu/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Stateful example should match production example', async () => {
    const url = getExampleUrl('core', 'toggle', 'stateful', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
