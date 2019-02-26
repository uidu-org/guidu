// @flow
import {
  getExampleUrl,
  takeScreenShot,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const openModalBtn = "[type='button']";
const modalDialog = "[role='dialog']";

// TODO: https://ecosystem.atlassian.net/browse/AK-5842
describe.skip('Snapshot Test', () => {
  it('Spotlight different-spotlights should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'onboarding',
      'different-spotlights',
      global.__BASEURL__,
    );
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
  it('Modal Basic example should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'onboarding',
      'modal-basic',
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
