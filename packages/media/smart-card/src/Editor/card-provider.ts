import { CardAppearance } from '../Card';
import Environments from '../environments';

export interface CardProvider {
  resolve(url: string, appearance: CardAppearance): Promise<any>;
}

export type ORSCheckResponse = {
  isSupported: boolean;
};

export type EnvironmentsKeys = keyof typeof Environments;

export class EditorCardProvider implements CardProvider {
  constructor(private envKey: EnvironmentsKeys = 'prod') {}

  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    try {
      const constructedUrl = `${Environments[this.envKey].resolverURL}/check`;
      const result: ORSCheckResponse = await (await fetch(constructedUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ resourceUrl: url }),
      })).json();

      if (result && result.isSupported) {
        return {
          type: appearance === 'inline' ? 'inlineCard' : 'blockCard',
          attrs: {
            url,
          },
        };
      }
    } catch (e) {
      // tslint:disable-next-line
      console.warn(
        `Error when trying to check Smart Card url "${url} - ${
          e.prototype.name
        } ${e.message}`,
        e,
      );
    }

    return Promise.reject(undefined);
  }
}

export const editorCardProvider = new EditorCardProvider();
