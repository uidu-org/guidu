// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it(`Progress-tracker example should match prod`, async () => {
    const url = getExampleUrl(
      'core',
      'progress-tracker',
      'basic',
      global.__BASEURL__,
    );
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
