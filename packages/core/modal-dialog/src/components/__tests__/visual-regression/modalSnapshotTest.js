// @flow
import {
  getExampleUrl,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openModalBtn = "[type='button']";
const modalDialog = "[role='dialog']";

// TODO: https://ecosystem.atlassian.net/browse/AK-5842
describe.skip('Snapshot Test', () => {
  it('Basic example should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'modal-dialog',
      'basic',
      global.__BASEURL__,
    );
    const { page } = global;

    await page.goto(url);
    await page.waitForSelector(openModalBtn);
    await page.click(openModalBtn);
    await page.waitFor(modalDialog);

    const image = await takeElementScreenShot(page, modalDialog);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
