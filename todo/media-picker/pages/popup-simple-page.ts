import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import { PopupUploadEventPayloadMap } from '../src/components/types';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

export type Event = {
  readonly name: string;
  readonly payload: any;
};

export type RecentUploadCard = {
  readonly filename: string;
};

/**
 * Popup Simple Example Page Object
 * @see https://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern
 */
export class PopupSimplePage {
  constructor(private readonly page: any) {}

  async clickUploadButton(): Promise<void> {
    const selector = '.e2e-upload-button';
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async getRecentUploadCards(): Promise<RecentUploadCard[]> {
    const selector = '.e2e-recent-upload-card';
    const results = await this.page.getHTML(selector);
    return results.map((html: string) => {
      const div = document.createElement('div');
      div.innerHTML = html.trim();
      const element = div.querySelector('.title .ellipsed-text');
      return {
        filename: element && element.textContent,
      };
    });
  }

  async getRecentUploadCard(
    filename: string,
  ): Promise<RecentUploadCard | undefined> {
    await this.page.waitUntil(async () =>
      (await this.getRecentUploadCards()).some(cardWithFilename(filename)),
    );
    return (await this.getRecentUploadCards()).find(cardWithFilename(filename));
  }

  async clickInsertButton(): Promise<void> {
    await this.page.click('.e2e-insert-button');
  }

  async getEvents(): Promise<Event[]> {
    return JSON.parse(await this.page.getText('#events'));
  }

  async getEvent(name: keyof PopupUploadEventPayloadMap): Promise<Event> {
    await this.page.waitUntil(async () =>
      (await this.getEvents()).some(eventWithName(name)),
    );

    const events = await this.getEvents();

    const event = events.find(eventWithName(name));
    if (event) {
      return event;
    } else {
      throw new Error(`Event ${name} not found`);
    }
  }

  async uploadFile(localPath: string) {
    await this.clickUploadButton();
    await this.page.chooseFile('input', localPath);
  }
}

export async function gotoPopupSimplePage(
  client: any,
): Promise<PopupSimplePage> {
  const page = new Page(client);
  const url = getExampleUrl('media', 'media-picker', 'popup-simple');
  await page.goto(url);
  return new PopupSimplePage(page);
}

function eventWithName(name: string) {
  return (event: Event) => event.name === name;
}

function cardWithFilename(filename: string) {
  return (card: RecentUploadCard) => card.filename === filename;
}
