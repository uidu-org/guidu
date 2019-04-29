// We still need postis here to communicate with the "link-account-handler" iframe
import * as postis from 'postis';
import * as uuid from 'uuid';
import { AuthProvider } from '@uidu/media-core';

import { ServiceName } from '../domain';
import { mapAuthToQueryParameters } from '../domain/auth';
import { objectToQueryString } from '../tools/objectToQueryString';
import { pickerUrl } from '../tools/fetcher/fetcher';

export class CloudService {
  constructor(private readonly userAuthProvider: AuthProvider) {}

  startAuth(redirectUrl: string, serviceName: ServiceName): Promise<void> {
    const win = window.open('', '_blank');

    return this.userAuthProvider()
      .then(auth => {
        return new Promise<void>(resolve => {
          const channelId = uuid.v4();

          const authParams = mapAuthToQueryParameters(auth);
          const queryString = objectToQueryString({
            ...authParams,
            redirectUrl: `${redirectUrl}?channelId=${channelId}`,
          } as any);

          // Electron does not support location.assign so we must use the
          // string setter to assign a new location to the window
          (win as any).location = `${pickerUrl(
            auth.baseUrl,
          )}/service/${serviceName}?${queryString}`;

          const channel = (postis as Function)({
            window: win,
            scope: channelId,
          });
          channel.ready(() => {
            channel.listen('auth-callback-received', () => {
              // notify auth window to close itself
              channel.send({ method: 'auth-callback-done', params: {} });

              // unregister the channel listener
              channel.destroy();

              resolve();

              // TODO: MSW-69 what happens if this times out?
            });
          });
        });
      })
      .catch(e => {
        if (win) {
          win.close();
        }
        throw e;
      });
  }
}
