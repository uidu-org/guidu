import { parse, stringify } from 'query-string';

import { Auth, isClientBasedAuth } from '../models/auth';
import { mapAuthToQueryParameters } from '../models/auth-query-parameters';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestParams = { [key: string]: any };

export type RequestHeaders = { [key: string]: string };

export type RequestOptions = {
  readonly method?: RequestMethod;
  readonly auth?: Auth;
  readonly params?: RequestParams;
  readonly headers?: RequestHeaders;
  readonly body?: any;
};

export function request(
  url: string,
  options: RequestOptions = {},
  controller?: AbortController,
): Promise<Response> {
  const { method = 'GET', auth, params, headers, body } = options;

  const processFetchResponse = (response: Response) => {
    if (response.ok || response.redirected) {
      return response;
    } else {
      throw response;
    }
  };

  if (method === 'GET') {
    return fetch(createUrl(url, { params, auth }), {
      method,
      body,
      headers,
      signal: controller && controller.signal,
    }).then(processFetchResponse);
  } else {
    return fetch(createUrl(url, { params }), {
      method,
      body,
      headers: withAuth(auth)(headers),
    }).then(processFetchResponse);
  }
}

export function mapResponseToJson(response: Response): Promise<any> {
  return response.json();
}

export function mapResponseToBlob(response: Response): Promise<Blob> {
  return response.blob();
}

export function mapResponseToVoid(_response: Response): Promise<void> {
  return Promise.resolve();
}

export type CreateUrlOptions = {
  readonly params?: RequestParams;
  readonly auth?: Auth;
};

export function createUrl(
  url: string,
  { params, auth }: CreateUrlOptions,
): string {
  const { baseUrl, queryParams } = extract(url);
  const authParams = auth && mapAuthToQueryParameters(auth);
  const queryString = stringify({
    ...queryParams,
    ...params,
    ...authParams,
  });
  const shouldAppendQueryString = queryString.length > 0;

  return `${baseUrl}${shouldAppendQueryString ? `?${queryString}` : ''}`;
}

function withAuth(auth?: Auth) {
  return (headers?: RequestHeaders): RequestHeaders | undefined => {
    if (auth) {
      return {
        ...(headers || {}),
        ...mapAuthToRequestHeaders(auth),
      };
    } else {
      return headers;
    }
  };
}

function extract(url: string): { baseUrl: string; queryParams?: any } {
  const index = url.indexOf('?');

  if (index > 0) {
    return {
      baseUrl: url.substring(0, index),
      queryParams: parse(url.substring(index + 1, url.length)),
    };
  } else {
    return {
      baseUrl: url,
    };
  }
}

function mapAuthToRequestHeaders(auth: Auth): RequestHeaders {
  if (isClientBasedAuth(auth)) {
    return {
      'X-Client-Id': auth.clientId,
      Authorization: `Bearer ${auth.token}`,
    };
  } else {
    return {
      'X-Issuer': auth.asapIssuer,
      Authorization: `Bearer ${auth.token}`,
    };
  }
}

export default request;
