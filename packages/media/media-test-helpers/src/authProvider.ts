import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { defaultCollectionName } from './collectionNames';
import { Auth, AuthProvider, AuthContext } from '@uidu/media-core';

const cachedAuths: { [key: string]: Promise<Auth> } = {};
const authProviderBaseURL = 'https://uidu.local:8443/media-playground/api/';

export class StoryBookAuthProvider {
  static create(
    isAsapEnvironment: boolean,
    access?: { [resourceUrn: string]: string[] },
  ): AuthProvider {
    const loadTenatAuth = async (collectionName: string): Promise<Auth> => {
      const config: AxiosRequestConfig = {
        withCredentials: true,
        baseURL: authProviderBaseURL,
        headers: {},
        params: {
          collection: collectionName,
          environment: isAsapEnvironment ? 'asap' : '',
        },
      };

      let response: AxiosResponse;
      if (access) {
        response = await axios.post('/token/tenant', { access }, config);
      } else {
        response = await axios.get('/token/tenant', config);
      }

      // We leverage the fact, that our internal /toke/tenant API returns data in the same format as Auth
      return response.data as Auth;
    };

    return (authContext?: AuthContext): Promise<Auth> => {
      const collectionName =
        (authContext && authContext.collectionName) || defaultCollectionName;
      const accessStr = access ? JSON.stringify(access) : '';
      const cacheKey = `${collectionName}-${accessStr}-${isAsapEnvironment}`;

      if (!cachedAuths[cacheKey]) {
        cachedAuths[cacheKey] = loadTenatAuth(collectionName);
      }
      return cachedAuths[cacheKey];
    };
  }
}
