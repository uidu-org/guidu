// @flow
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlHome = 'http://localhost:9000/';

const app = '#app';
const atlaskitLayer = '[spacing="cosy"]';
const atlaskitLogo = '[alt="Atlaskit logo"]';
const atlaskitTitle = 'h1';

BrowserTestCase(
  `home.js: The website home page should be displayed without errors`,
  async client => {
    const homeTest = new Page(client);
    await homeTest.goto(urlHome);
    await homeTest.waitForSelector(app);
    const subHeaderTitle = await homeTest.getText(atlaskitTitle);
    const logo = await homeTest.isVisible(atlaskitLogo);
    const pageIsVisible = await homeTest.isVisible(atlaskitLayer);

    expect(logo).toBe(true);
    expect(subHeaderTitle).toBe('Atlaskit');
    expect(pageIsVisible).toBe(true);
    await homeTest.checkConsoleErrors();
  },
);
